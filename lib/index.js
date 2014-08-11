var pc = require("paperclip"),
bindable = require("bindable");

function BootstrapAttrBinding () {
  pc.BaseNodeBinding.apply(this, arguments);
}

BaseNodeBinding.extend(BootstrapAttrBinding, {
  type: "attr",
  bind: function (context) {
    pc.BaseNodeBinding.prototype.bind.apply(this, arguments);

    if (!process.browser) return;

    var $node = $(this.node),
    data      = $node.data(),
    self = this;

    var d = new bindable.Object();

    for (var key in data) {
      var newKey = key.replace(/([A-Z])/g, ".$1").toLowerCase(); // camel case to dot syntax
      d.set(newKey, data[key]);
    }


    if (self.name === "data-spy") {
      delete data["data-spy"];
      var spyOn = $node.attr(self.name);
      $node[spyOn](d.context());
    }
  }
});

module.exports = function (pc) {
  ["data-spy"].forEach(function (attr) {
    pc.nodeBinding(attr, BootstrapAttrBinding);
  });
}