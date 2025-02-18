!(function(win, doc){
	class RadioStation extends HTMLElement {
		constructor() {
			super();
			let template = `%template%`;
			this.attachShadow({
				mode: "open"
			}).innerHTML = template;
		}

		render() {
			// Прорисовка
		}

		disconected() {
			// Удаление объекта
		}

		static get observedAttributes() {
			// Массив отслеживаемых атрибутов
			return [];
		}

		attributeChangedCallback(name, oldValue, newValue) {
			// Отслеживание атрибутов
			this.render();
		}

		handleError() {
			// Ошибки?
			console.log('ERROR');
		}

		connectedCallback() {
			// Добавление в DOM
			if(!this.rendered) {
				this.render();
				this.rendered = true;
			}
		}

		disconnectedCallback() {
			// Удаление из DOM.
			if(this.rendered) {
				this.rendered = false;
				this.disconected();
			}
		}
	}
	win.customElements.define("radio-station", RadioStation);
}(window, document));