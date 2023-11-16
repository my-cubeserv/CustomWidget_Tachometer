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
			<tr>\
                <td>select Top</td>\
                <td><input id="ap_selectedTop" type="number" name="selectedTop"  max="6" min="1"></td>\
            </tr>\
			 <tr>\
                <td>Background color top 1</td>\
                <td><input id="ap_bgcolor1" type="color" name="bgColor1"></td>\
            </tr>\
			<tr>\
                <td>Background color top 2</td>\
                <td><input id="ap_bgcolor2" type="color" name="bgColor2"></td>\
            </tr>\
			<tr>\
                <td>Background color top 3</td>\
                <td><input id="ap_bgcolor3" type="color" name="bgColor3"></td>\
            </tr>\
			<tr>\
                <td>Background color top 4</td>\
                <td><input id="ap_bgcolor4" type="color" name="bgColor4"></td>\
            </tr>\
			<tr>\
                <td>Background color top 5</td>\
                <td><input id="ap_bgcolor5" type="color" name="bgColor5"></td>\
            </tr>\
			<tr>\
                <td>Background color top 6</td>\
                <td><input id="ap_bgcolor6" type="color" name="bgColor6"></td>\
            </tr>\
            </table>\
        </form>\
    ';

    class PyramidChartProperties extends HTMLElement {
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
								bgColor1: this.bgColor1,
								bgColor2: this.bgColor2,
								bgColor3: this.bgColor3,
								bgColor4: this.bgColor4,
								bgColor5: this.bgColor5,
								bgColor6: this.bgColor6
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
						bgcolor1: this.bgcolor1,
						bgcolor2: this.bgcolor2,
						bgcolor3: this.bgcolor3,
						bgcolor4: this.bgcolor4,
						bgcolor5: this.bgcolor5,
						bgcolor6: this.bgcolor6
                    }
                }
            }));
            return false;
        }
		get color() {
			return this._shadowRoot.getElementById("ap_textcolor").value;
		}
		get value() {
            return this._shadowRoot.getElementById("ap_selectedTop").value;
        }
		get fontsize() {
            return this._shadowRoot.getElementById("ap_fontsize").value;
        }
		get bgcolor1() {
			return this._shadowRoot.getElementById("ap_bgcolor1").value;
		}
		get bgcolor2() {
			return this._shadowRoot.getElementById("ap_bgcolor2").value;
		}
		get bgcolor3() {
			return this._shadowRoot.getElementById("ap_bgcolor3").value;
		}
		get bgcolor4() {
			return this._shadowRoot.getElementById("ap_bgcolor4").value;
		}
		get bgcolor5() {
			return this._shadowRoot.getElementById("ap_bgcolor5").value;
		}
		get bgcolor6() {
			return this._shadowRoot.getElementById("ap_bgcolor6").value;
		}
        set color(v) {
            this._shadowRoot.getElementById("ap_textcolor").value = v;
        }
        set value(v) {
            this._shadowRoot.getElementById("ap_selectedTop").value = v;
        }
		set fontsize(v) {
            this._shadowRoot.getElementById("ap_fontsize").value = v;
        }
		set bgcolor1(v) {
            this._shadowRoot.getElementById("ap_bgcolor1").value = v;
        }
		set bgcolor2(v) {
            this._shadowRoot.getElementById("ap_bgcolor2").value = v;
        }
		set bgcolor3(v) {
            this._shadowRoot.getElementById("ap_bgcolor3").value = v;
        }
		set bgcolor4(v) {
            this._shadowRoot.getElementById("ap_bgcolor4").value = v;
        }
		set bgcolor5(v) {
            this._shadowRoot.getElementById("ap_bgcolor5").value = v;
        }
		set bgcolor6(v) {
            this._shadowRoot.getElementById("ap_bgcolor6").value = v;
        }

    }

    customElements.define('chart-style', PyramidChartProperties);
})();
