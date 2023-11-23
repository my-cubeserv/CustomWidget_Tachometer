(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '\
        <form id="form">\
            <table style="width: 100%;">\
             <tr>\
                <td>Text Color</td>\
                <td><input id="ap_textcolor" type="color" name="textColor"></td>\
            </tr>\
            <tr>\
                <td>Font size</td>\
                <td><input id="ap_fontsize" type="number" name="fontSize" max="30" min="6"></td>\
            </tr>\
            </table>\
        </form>\
    ';

    class TachometerProperties extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
            this._shadowRoot.querySelectorAll("#form input").forEach(elem => {
                elem.addEventListener("change", this._submit.bind(this));
            });
            this._shadowRoot.querySelectorAll("#form textarea").forEach(elem => {
                elem.addEventListener("change", e => {
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('propertiesChanged', {
                        "detail": {
                            "properties": {
								value: this.value,
                                color: this.color,
								fontsize: this.fontsize,
                            }
                        }
                    }));
                    return false;
                });
            });
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                "detail": {
                    "properties": {
                        value: this.value,
                        color: this.color,
						fontsize: this.fontsize,
                    }
                }
            }));
            return false;
        }
		get color() {
			return this._shadowRoot.getElementById("ap_textcolor").value;
		}
		get fontsize() {
            return this._shadowRoot.getElementById("ap_fontsize").value;
        }
	    set color(v) {
            this._shadowRoot.getElementById("ap_textcolor").value = v;
        }
		set fontsize(v) {
            this._shadowRoot.getElementById("ap_fontsize").value = v;
        }
    }
    customElements.define('chart-style', TachometerProperties);
})();
