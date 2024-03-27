const { withAndroidStyles } = require('@expo/config-plugins');

const withCustomStyles = config => {
    return withAndroidStyles(config, async config => {
        config.modResults = applyCustomStyles(config.modResults);
        return config;
    });
};

function applyCustomStyles(styles) {
    // Add items to the App Theme
    const appTheme = styles.resources.style.find(style => style.$.name === 'AppTheme');
    if (appTheme) {
        appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:datePickerDialogTheme' } });
        appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:timePickerDialogTheme' } });
    }
    
    styles.resources.style.push({
        $: { name: 'Dialog.Theme', parent: 'Theme.AppCompat.Dialog' },
        item: [
            // { _: '#878787', $: { name: 'android:headerBackground' } },
            // { _: '#673AB7', $: { name: 'android:numbersTextColor' } },
            // { _: '#878787', $: { name: 'android:numbersSelectorColor' } },
            // { _: '#61E761', $: { name: 'android:numbersBackgroundColor' } },
            // { _: '#878787', $: { name: 'android:background' } },
            // { _: '#ffffff', $: { name: 'android:textColor' } },
            // { _: '#ffffff', $: { name: 'android:textColorPrimary' } },
            // { _: '#ffffff', $: { name: 'android:textColorSecondary' } },
        ],
    });


    return styles;
}

module.exports = withCustomStyles;