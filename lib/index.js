var pc = require("paperclip");

function BootstrapAttrBinding () {
  pc.BaseNodeBinding.apply(this, arguments);
}

protoclass(pc.BaseNodeBinding, BootstrapAttrBinding, {
  type: "attr",
  bind: function (context) {
    pc.BaseNodeBinding.prototype.bind.apply(this, arguments);

    if (!process.browser) return;

    var $node = $(this.node),
    data      = $node.data(),
    self = this;

    if (self.name === "data-spy") {
      delete data["data-spy"];
      var spyOn = $node.attr(self.name);
      $node[spyOn](data);
    }
  }
});

module.exports = function (pc) {
  ["data-spy"].forEach(function (attr) {
    pc.nodeBinding(attr, BootstrapAttrBinding);
  });
}