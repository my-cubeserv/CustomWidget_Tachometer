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
                <td>Opasity</td>\
                <td><input id="ap_opasity" type="number" name="opasity" max="1" min="0"></td>\
            </tr>\
	     <tr>\
                <td>Border Radius</td>\
                <td><input id="ap_bradius" type="number" name="bradius" max="20" min="0"></td>\
            </tr>\
	    <tr>\
                <td>Background color 1</td>\
	       <!--td><input id="ap_von1" type="number" name="von" max="100" min="0"></td-->\
	       <td><input id="ap_bis1" type="number" name="bis" max="100" min="0"></td>\
                <td><input id="ap_bgcolor1" type="color" name="bgColor1"></td>\
            </tr>\
			<tr>\
                <td>Background color 2</td>\
	    	<!--td><input id="ap_von2" type="number" name="von" max="100" min="0"></td-->\
	      	<td><input id="ap_bis2" type="number" name="bis" max="100" min="0"></td>\
                <td><input id="ap_bgcolor2" type="color" name="bgColor2"></td>\
            </tr>\
			<tr>\
                <td>Background color 3</td>\
	   	<!--td><input id="ap_von3" type="number" name="von" max="100" min="0"></td-->\
	       <td><input id="ap_bis3" type="number" name="bis" max="100" min="0"></td>\
                <td><input id="ap_bgcolor3" type="color" name="bgColor3"></td>\
            </tr>\
			<tr>\
                <td>Background color 4</td>\
	      <!--td><input id="ap_von4" type="number" name="von" max="100" min="0"></td-->\
	       <td><input id="ap_bis4" type="number" name="bis" max="100" min="0"></td>\
                <td><input id="ap_bgcolor4" type="color" name="bgColor4"></td>\
            </tr>\
			<tr>\
                <td>Background color 5</td>\
	       <!--td><input id="ap_von5" type="number" name="von" max="100" min="0"></td-->\
	       <td><input id="ap_bis5" type="number" name="bis" max="100" min="0"></td>\
                <td><input id="ap_bgcolor5" type="color" name="bgColor5"></td>\
            </tr>\
			<tr>\
                <td>Background color 6</td>\
	       <!--td><input id="ap_von6" type="number" name="von" max="100" min="0"></td-->\
	       <td><input id="ap_bis6" type="number" name="bis" max="100" min="0"></td>\
                <td><input id="ap_bgcolor6" type="color" name="bgColor6"></td>\
            </tr>\
	    <tr>\
                <td>Titel</td>\
                <td colspan="2"><input id="ap_title" type="string" name="title"></td>\
            </tr>\
            </table>\
        </form>\
    ';

    class TachometerChartProperties extends HTMLElement {
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
                                color: this.color,
				fontsize: this.fontsize,
				bgColor1: this.bgColor1,
				bgColor2: this.bgColor2,
				bgColor3: this.bgColor3,
				bgColor4: this.bgColor4,
				bgColor5: this.bgColor5,
				bgColor6: this.bgColor6,
				von1: this.von1,
				von2: this.von2,
				von3: this.von3,
				von4: this.von4,
				von5: this.von5,
				von6: this.von6,
				bis1: this.bis1,
				bis2: this.bis2,
				bis3: this.bis3,
				bis4: this.bis4,
				bis5: this.bis5,
				bis6: this.bis6,
				opasity: this.opasity,
				title: this.title,
				bradius: this.bradius
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
                        color: this.color,
			fontsize: this.fontsize,
			bgcolor1: this.bgcolor1,
			bgcolor2: this.bgcolor2,
			bgcolor3: this.bgcolor3,
			bgcolor4: this.bgcolor4,
			bgcolor5: this.bgcolor5,
			bgcolor6: this.bgcolor6,
			von1: this.von1,
			von2: this.von2,
			von3: this.von3,
			von4: this.von4,
			von5: this.von5,
			von6: this.von6,
			bis1: this.bis1,
			bis2: this.bis2,
			bis3: this.bis3,
			bis4: this.bis4,
			bis5: this.bis5,
			bis6: this.bis6,
			opasity: this.opasity,
			title: this.title,
			bradius: this.bradius
                    }
                }
            }));
            return false;
        }

//get value of properties
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
	    	get von1() {
			//return this._shadowRoot.getElementById("ap_von1").value;
		}
	    	get von2() {
			//return this._shadowRoot.getElementById("ap_von2").value;
		}
	    	get von3() {
			//return this._shadowRoot.getElementById("ap_von3").value;
		}
	   	 get von4() {
			//return this._shadowRoot.getElementById("ap_von4").value;
		}
	   	 get von5() {
			//return this._shadowRoot.getElementById("ap_von5").value;
		}
	   	 get von6() {
			//return this._shadowRoot.getElementById("ap_von6").value;
		}
	   	 get bis1() {
			return this._shadowRoot.getElementById("ap_bis1").value;
		}
		get bis2() {
			return this._shadowRoot.getElementById("ap_bis2").value;
		}
		get bis3() {
			return this._shadowRoot.getElementById("ap_bis3").value;
		}
		get bis4() {
			return this._shadowRoot.getElementById("ap_bis4").value;
		}
		get bis5() {
			return this._shadowRoot.getElementById("ap_bis5").value;
		}
		get bis6() {
			return this._shadowRoot.getElementById("ap_bis6").value;
		}
	   	get opasity() {
			return this._shadowRoot.getElementById("ap_opasity").value;
		}
	   	get title() {
			return this._shadowRoot.getElementById("ap_title").value;
		}
	   	get bradius() {
			return this._shadowRoot.getElementById("ap_bradius").value;
		}
// set value of properties
        set color(v) {
            this._shadowRoot.getElementById("ap_textcolor").value = v ;
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
	    set von1(v) {
           // this._shadowRoot.getElementById("ap_von1").value = v;
        }
	     set von2(v) {
           // this._shadowRoot.getElementById("ap_von2").value = v;
        }
	     set von3(v) {
           // this._shadowRoot.getElementById("ap_von3").value = v;
        }
	     set von4(v) {
            //this._shadowRoot.getElementById("ap_von4").value = v;
        }
	     set von5(v) {
            //this._shadowRoot.getElementById("ap_von5").value = v;
        }
	     set von6(v) {
           //this._shadowRoot.getElementById("ap_von6").value = v;
        }
	     set bis1(v) {
            this._shadowRoot.getElementById("ap_bis1").value = v;
        }
	    set bis2(v) {
            this._shadowRoot.getElementById("ap_bis2").value = v;
        }
	    set bis3(v) {
            this._shadowRoot.getElementById("ap_bis3").value = v;
        }
	    set bis4(v) {
            this._shadowRoot.getElementById("ap_bis4").value = v;
        }
	    set bis5(v) {
            this._shadowRoot.getElementById("ap_bis5").value = v;
        }
	    set bis6(v) {
            this._shadowRoot.getElementById("ap_bis6").value = v;
        }
	set opasity(v) {
            this._shadowRoot.getElementById("ap_opasity").value = v;
        }
	set title(v) {
            this._shadowRoot.getElementById("ap_title").value = v;
        }
	set bradius(v) {
            this._shadowRoot.getElementById("ap_bradius").value = v;
        }
    }

    customElements.define('chart-style', TachometerChartProperties);
})();
