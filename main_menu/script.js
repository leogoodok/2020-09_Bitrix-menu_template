/** JS скрипты Шаблона-сайта */
BX.namespace("BX.ADM");

if (typeof(BX.ADM.CompMainMenu) === "undefined") {

	BX.ADM.CompMainMenu = function() {
		this._settings = {};
		this._panels = [];
	};

	BX.ADM.CompMainMenu.prototype = {
		initialize: function(config) {
			this._settings = config ? config : {};

			const classContainer = this.getSetting('nameClassContainerComponent', false),
				  classPanelSubmenu = this.getSetting('nameClassPanelSubmenu', false),
				  classBtnClose = this.getSetting('nameClassBtnClosePanel', false),
				  classBtnOpen = this.getSetting('nameClassBtnOpenPanel', false);

			if (!!classPanelSubmenu) {
				const panelSubmenu = document.querySelectorAll('.' + classContainer + ' .' + classPanelSubmenu);

				for (let elem of panelSubmenu) {
					let panelSubmenuId = elem.getAttribute('id');
					if (!!panelSubmenuId) {
						this.setPanel(panelSubmenuId);
					}
				}
			}

			if (!!classContainer && !!classBtnOpen) {
				const buttonsOpen = document.querySelectorAll('.' + classContainer + ' .' + classBtnOpen);

				for (let elemBtn of buttonsOpen) {
					let dataParentPanel = elemBtn.getAttribute('data-parent-panel'),
						dataNextPanel = elemBtn.getAttribute('data-next-panel');

					if (!!dataParentPanel && !!dataNextPanel) {
						BX.bind(
							elemBtn,
							"click",
							BX.delegate(this.handleOpenPanelButtonClick, this)
						);
					}
				}
			}

			if (!!classContainer && !!classBtnClose) {
				const buttonsClose = document.querySelectorAll('.' + classContainer + ' .' + classBtnClose);

				for (let elemBtn of buttonsClose) {
					let dataParentPanel = elemBtn.getAttribute('data-parent-panel'),
						dataPrevPanel = elemBtn.getAttribute('data-prev-panel');

					if (!!dataParentPanel && !!dataPrevPanel) {
						BX.bind(
							elemBtn,
							"click",
							BX.delegate(this.handleClosePanelButtonClick, this)
						);
					}
				}
			}
		},

		getSetting: function(name, defaultval) {
			return typeof(this._settings[name]) != 'undefined' ? this._settings[name] : defaultval;
		},

		setSetting: function(name, value) {
			this._settings[name] = value;
		},
		
		getPanels: function() {
			return this._panels;
		},

		setPanel: function(panelId) {
			this._panels.push(panelId);
		},

		handleOpenPanelButtonClick: function(event) {
			event.stopPropagation();

			const classBtnOpen = this.getSetting('nameClassBtnOpenPanel', false);
			if (!classBtnOpen) {
				return;
			}

			const elemBtn = event.target.closest('.' + classBtnOpen);
			if (!elemBtn) {
				return;
			}

			const dataParentPanel = elemBtn.getAttribute('data-parent-panel'),
				  dataNextPanel = elemBtn.getAttribute('data-next-panel');

			if (!!dataParentPanel && !!dataNextPanel) {
				this.actionOpenPanel(dataParentPanel, dataNextPanel);
			}
		},

		handleClosePanelButtonClick: function(event) {
			event.stopPropagation();

			const classBtnClose = this.getSetting('nameClassBtnClosePanel', false);
			if (!classBtnClose) {
				return;
			}

			const elemBtn = event.target.closest('.' + classBtnClose);
			if (!elemBtn) {
				return;
			}

			const dataParentPanel = elemBtn.getAttribute('data-parent-panel'),
				  dataPrevPanel = elemBtn.getAttribute('data-prev-panel');

			if (!!dataParentPanel && !!dataPrevPanel) {
				this.actionClosePanel(dataParentPanel, dataPrevPanel);
			}
		},

		actionOpenPanel: function(parentPanelId, nextPanelId) {
			const elemParentPanel = BX(parentPanelId),
				  elemNextPanel = BX(nextPanelId),
				  classActivePanelSubmenu = this.getSetting('nameClassActivePanelSubmenu', false),
				  classShowAnimation = this.getSetting('nameClassShowAnimation', false),
				  classHideAnimation = this.getSetting('nameClassHideAnimation', false),
				  animationDuration = this.getSetting('animationDuration', 1500);

			if (!!elemParentPanel) {
				if (!!classActivePanelSubmenu) {
					BX.removeClass(elemParentPanel, classActivePanelSubmenu);
				}

				if (!!classHideAnimation) {
					BX.removeClass(elemParentPanel, classHideAnimation);
				}
			}

			if (!!elemNextPanel) {
				if (!!classActivePanelSubmenu) {
					BX.addClass(elemNextPanel, classActivePanelSubmenu);
				}

				if (!!classHideAnimation) {
					BX.removeClass(elemNextPanel, classHideAnimation);
				}

				if (!!classShowAnimation) {
					BX.addClass(elemNextPanel, classShowAnimation);
				}
			}

			// this.actionRemoveClassPanel(nextPanelId);
			setTimeout(BX.delegate(this.actionRemoveClassPanel, this), animationDuration, nextPanelId);
		},

		actionClosePanel: function(parentPanelId, prevPanelId) {
			const elemParentPanel = BX(parentPanelId),
				  elemPrevPanel = BX(prevPanelId),
				  classActivePanelSubmenu = this.getSetting('nameClassActivePanelSubmenu', false),
				//   classShowAnimation = this.getSetting('nameClassShowAnimation', false),
				  classHideAnimation = this.getSetting('nameClassHideAnimation', false),
				  animationDuration = this.getSetting('animationDuration', 1500);

			if (!!elemParentPanel) {
				if (!!classActivePanelSubmenu) {
					BX.removeClass(elemParentPanel, classActivePanelSubmenu);
				}

				if (!!classHideAnimation) {
					BX.addClass(elemParentPanel, classHideAnimation);
				}
			}

			if (!!elemPrevPanel) {
				if (!!classActivePanelSubmenu) {
					BX.addClass(elemPrevPanel, classActivePanelSubmenu);
				}

				if (!!classHideAnimation) {
					BX.removeClass(elemPrevPanel, classHideAnimation);
				}

				// if (!!classShowAnimation) {
				// 	BX.addClass(elemPrevPanel, classShowAnimation);
				// }
			}

			// this.actionRemoveClassPanel(prevPanelId);
			setTimeout(BX.delegate(this.actionRemoveClassPanel, this), animationDuration, prevPanelId);
		},

		actionRemoveClassPanel: function(activePanelId) {
			const allPanels = this.getPanels(),
				  classShowAnimation = this.getSetting('nameClassShowAnimation', false),
				  classHideAnimation = this.getSetting('nameClassHideAnimation', false);

			for (let index = 0; index < allPanels.length; index++) {
				let panelId = allPanels[index];

				if (panelId != activePanelId) {
					let elemPanel = BX(panelId);
					if (!!elemPanel) {
						if (!!classShowAnimation) {
							BX.removeClass(elemPanel, classShowAnimation);
						}
						if (!!classHideAnimation) {
							BX.removeClass(elemPanel, classHideAnimation);
						}
					}
				}
			}
		},
	};

	BX.ADM.CompMainMenu.create = function(config) {
		let self = new BX.ADM.CompMainMenu();
		self.initialize(config);
		return self;
	};
};


BX.ready(function() {
	BX.ADM.CompMainMenu.create({
		'nameClassBtnClosePanel': 'js-main_submenu__btn-close-panel',
		'nameClassBtnOpenPanel': 'js-main_submenu__btn-open-panel',
		'nameClassPanelsSubmenu': 'js-main-submenu__panel',
		'nameClassContainerComponent': 'body__panel-menu',
		'nameClassPanelSubmenu': 'main-menu__panel',
		'nameClassActivePanelSubmenu': 'main-menu__panel--active',
		'nameClassShowAnimation': 'animation-show',
		'nameClassHideAnimation': 'animation-hide',
		'animationDuration': 3000,
	});
});
