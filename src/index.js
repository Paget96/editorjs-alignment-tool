/**
 * Build styles
 */
require('./index.css').toString();

export default class TextAlignmentTool {

    /**
     * Default alignment
     *
     * @public
     * @returns {string}
     */
    static get DEFAULT_ALIGNMENT() {
        return 'justify';
    }

    static get isTune() {
        return true;
    }

    getAlignment() {
        if (this.settings?.blocks && this.settings.blocks.hasOwnProperty(this.block.name)) {
            return this.settings.blocks[this.block.name]
        }
        if (this.settings?.default) {
            return this.settings.default
        }
        return TextAlignmentTool.DEFAULT_ALIGNMENT
    }
    /**
     *
     * @param api.api
     * @param api
     * @param data 既に設定されているデータ
     * @param settings tuneに設定項目
     * @param block tuneに設定されてるblock
     * @param api.data
     * @param api.config
     * @param api.block
     */
    constructor({
        api, data, config, block
    }) {
        this.api = api;
        this.block = block;
        /**
         config:{
            default: "right",
            blocks: {
              header: 'center',
              list: 'right'
            }
          },
         */
        this.settings = config;
        this.data = data || { alignment: this.getAlignment() }
        this._CSS = {
            alignment: {
                left: 'editorjs-text-alignment--left',
                center: 'editorjs-text-alignment--center',
                right: 'editorjs-text-alignment--right',
                justify: 'editorjs-text-alignment--justify',
            }
        }
    }

    /**
     * block自体をwrapしてくれる
     * constructorで与えられたalignmentを代入しようとすると、holderが確定してなく
     * renderでやろうとすると、tuneを表示時に処理が走る
     *
     * @param blockContent
     */
    wrap(blockContent) {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.toggle(this._CSS.alignment[this.data.alignment])
        this.wrapper.append(blockContent)
        return this.wrapper
    }

    setAlignment(alignment) {
        this.data = {
            alignment: alignment,
        };

        this.wrapper.classList.remove(
            ...Object.values(this._CSS.alignment),
        );

        this.wrapper.classList.toggle(this._CSS.alignment[alignment], alignment === this.data.alignment)
    }

    /**
     * rendering block tune
     *
     * @returns {*}
     */
    render() {
        const self = this;

        return [
            {
                name: 'left',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
                label: self.api.i18n.t('Align left'),
                isActive: self.data.alignment === 'left',
                closeOnActivate: true,
                onActivate: (item, e) => {
                    self.setAlignment(item.name);
                },
            },
            {
                name: 'center',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
                label: self.api.i18n.t('Align center'),
                isActive: self.data.alignment === 'center',
                closeOnActivate: true,
                onActivate: (item, e) => {
                    self.setAlignment(item.name);
                },
            },
            {
                name: 'right',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 19h-28c-1.104 0-2 .896-2 2s.896 2 2 2h28c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 41h-28c-1.104 0-2 .896-2 2s.896 2 2 2h28c1.104 0 2-.896 2-2s-.896-2-2-2z"/></svg>`,
                label: self.api.i18n.t('Align right'),
                isActive: self.data.alignment === 'right',
                closeOnActivate: true,
                onActivate: (item, e) => {
                    self.setAlignment(item.name);
                },
            },
            {
                name: 'justify',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>`,
                label: self.api.i18n.t('Justify'),
                isActive: self.data.alignment === 'justify',
                closeOnActivate: true,
                onActivate: (item, e) => {
                    self.setAlignment(item.name);
                },
            }
        ]
    }
    /**
     * save
     *
     * @returns {*}
     */
    save() {
        return this.data;
    }
}


module.exports = TextAlignmentTool;