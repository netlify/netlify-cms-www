---
title: Extending Widgets
position: 60
---
<!-- AUTO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/netlify/netlify-cms/master/docs/extending.md) -->

<!-- AUTO-GENERATED-CONTENT:END -->

**Example:**

```html
<script src="https://unpkg.com/netlify-cms@~0.5/dist/cms.js"></script>
<script>
CMS.registerEditorComponent({
  // Internal id of the component
  id: "youtube",
  // Visible label
  label: "Youtube",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{name: 'id', label: 'Youtube Video ID', widget: 'string'}],
  // Pattern to identify a block as being an instance of this component
  pattern: /^{{</*\s?youtube (\S+)\s?*/>}}/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return '{{</* youtube ' + obj.id + ' */>}}';
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
