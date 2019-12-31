import Vue from 'vue'


Vue.component('v-select', {
    props: {
        options: {
            type: [Object,Array],
            default: function() {return [];}
        },
        value: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "select one"
        },
        label: {
            type:String,
            default:""
        },
        labelid: {
            type:String,
            default:""
        },
        multiple: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        },
        allowClear: {
            type: Boolean,
            default: true
        },
        minimumResultsForSearch: {
            type: Number,
            default: 1
        }
    },
    watch: {
        value: function(value) {
            // https://stackoverflow.com/questions/43941840/vue-js-select2-multiple-select
            if (this.multiple && (Array.from(value).sort().join(",") !== Array.from($(this.$el).val()).sort().join(","))) {
                $(this.$el).val(value).trigger('change');
            }else if (!this.multiple && value !== $(this.$el).val()) {
                $(this.$el).val(value).trigger('change');
            }
        },
        options: function (options) {
            // $(this.$el).empty().select2(this.setOptions(options));
            // 默认选中第一个
            // if (!this.multiple && this.selected) {
            //     $(this.$el).prop("selectedIndex", 0).change();
            // }
            if (!this.multiple) {
                $(this.$el).
                    empty().
                    prepend('<option></option>').
                    select2(this.setOptions(options)).val(this.value).trigger('change');
                if (this.selected) {
                    $(this.$el).prop("selectedIndex", 1).change();
                }
            }else {
                $(this.$el).empty().select2(this.setOptions(options)).val(this.value).trigger('change');
            }

        }
    },
    mounted: function () {
        var vm = this;
        $(this.$el)
            .select2(this.setOptions(this.options))
            .val(this.value)
            .trigger('change')
            .on('change', function () {
                vm.$emit('input', $(vm.$el).val());
            });
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy');
    },
    methods: {
        setOptions: function(options) {
            if (this.label) {
                options = options.map(item => {
                    if (this.labelid) {
                        return {
                            text:item[this.label],
                            id: item[this.labelid]
                        };
                    }
                    return {
                        text:item[this.label],
                        id: item[this.label]
                    };
                });
            }
            return {
                data: options,
                theme:"bootstrap",
                width: "100%",
                placeholder:this.placeholder,
                closeOnSelect: true,
                multiple:this.multiple,
                allowClear:this.allowClear,
                minimumResultsForSearch: this.minimumResultsForSearch
            };
        }
    },
    template: '<select><slot></slot></select>'
});


Vue.directive('tokenfield', {
    twoWay: true,
    priority: 1000,
    bind: function () {
        var self = this;
        $(this.el).on('tokenfield:removedtoken', function (e) {
            self.set($(self.el).tokenfield('getTokensList', ',', false).split(','));
        }).on('tokenfield:createdtoken', function (e) {
            self.set($(self.el).tokenfield('getTokensList', ',', false).split(','));
        }).tokenfield();
    },
    update: function (value) {
        $(this.el).tokenfield('setTokens', value);
    }
});

export default {};
