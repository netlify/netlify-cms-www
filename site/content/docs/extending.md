---
title: Extending Widgets
position: 6
---

# Extending With Widgets

The NetlifyCMS exposes an `window.CMS` global object that you can use to register custom widgets, previews, and editor plugins. The available widget extension methods are:

* **registerWidget:** lets you register a custom widget.
* **registerEditorComponent:** lets you add a block component to the Markdown editor.

### Writing React Components inline

The `registerWidget` requires you to provide a React component. If you have a build process in place for your project, it is possible to integrate with this build process.

However, although possible, it may be cumbersome or even impractical to add a React build phase. For this reason, NetlifyCMS exposes two constructs globally to allow you to create components inline: ‘createClass’ and ‘h’ (alias for React.createElement).

## `registerWidget`

Register a custom widget.

```js
CMS.registerWidget(name, control, \[preview\])
```

**Params:**

Param | Type | Description
--- | --- | ---
`name` | string | Widget name, allows this widget to be used via the field `widget` property in config
`control` | React.Component \| string | <ul><li>React component that renders the control, receives the following props: <ul><li>**value:** Current field value</li><li>**onChange:** Callback function to update the field value</li></ul></li><li>Name of a registered widget whose control should be used (includes built in widgets).</li></ul>
[`preview`] | React.Component, optional | Renders the widget preview, receives the following props: <ul><li>**value:** Current preview value</li><li>**field:** Immutable map of current field configuration</li><li>**metadata:** Immutable map of any available metadata for the current field</li><li>**getAsset:** Function for retrieving an asset url for image/file fields</li><li>**entry:** Immutable Map of all entry data</li><li>**fieldsMetaData:** Immutable map of metadata from all fields.</li></ul>
* **field:** The field type that this widget will be used for.
* **control:** A React component that renders the editing interface for this field. Two props will be passed:
  * **value:** The current value for this field.
  * **onChange:** Callback function to update the field value.
* **preview (optional):** A React component that renders the preview of how the content will look. A `value` prop will be passed to this component.

**Example:**

```html
<script src="https://unpkg.com/netlify-cms@^0.7.0/dist/cms.js"></script>
<script>
var CategoriesControl = createClass({
  handleChange: function(e) {
    this.props.onChange(e.target.value.split(',').map((e) => e.trim()));
  },

  render: function() {
    var value = this.props.value;
    return h('input', { type: 'text', value: value ? value.join(', ') : '', onChange: this.handleChange });
  }
});

var CategoriesPreview = createClass({
  render: function() {
    return h('ul', {},
      this.props.value.map(function(val, index) {
        return h('li', {key: index}, val);
      })
    );
  }
});

CMS.registerWidget('categories', CategoriesControl, CategoriesPreview);
</script>
```

## `registerEditorComponent`

Register a block level component for the Markdown editor:

    CMS.registerEditorComponent(definition)

**Params**

* **definition:** The component definition; must specify: id, label, fields, patterns, fromBlock, toBlock, toPreview

**Example:**

```html
<script src="https://unpkg.com/netlify-cms@^0.7.0/dist/cms.js"></script>
<script>
CMS.registerEditorComponent({
  // Internal id of the component
  id: "youtube",
  // Visible label
  label: "Youtube",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{name: 'id', label: 'Youtube Video ID', widget: 'string'}],
  // Pattern to identify a block as being an instance of this component
  pattern: /youtube (\S+)\s/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return 'youtube ' + obj.id;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<img src="http://img.youtube.com/vi/' + obj.id + '/maxresdefault.jpg" alt="Youtube Video"/>'
    );
  }
});
</script>
```

**Result:**

![youtube-widget](/img/youtube-widget.png)

