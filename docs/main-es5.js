(function () {
  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /Users/kleemans/GitHub/sudoku-solver.ch/src/main.ts */
      "zUnb");
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "M+Yo":
    /*!*******************************!*\
      !*** ./src/app/model/util.ts ***!
      \*******************************/

    /*! exports provided: Util */

    /***/
    function MYo(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Util", function () {
        return Util;
      });
      /* harmony import */


      var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! lodash */
      "LvDl");
      /* harmony import */


      var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var randomcolor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! randomcolor */
      "/Zut");
      /* harmony import */


      var randomcolor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(randomcolor__WEBPACK_IMPORTED_MODULE_1__);

      var Util = /*#__PURE__*/function () {
        function Util() {
          _classCallCheck(this, Util);
        }

        _createClass(Util, null, [{
          key: "count",

          /**
           * Returns number of occurences of value in string.
           */
          value: function count(str, value) {
            var regExp = new RegExp(value, 'gi');
            return (str.match(regExp) || []).length;
          }
          /**
           * Replace all string occurences of oldVal with newVal in str.
           */

        }, {
          key: "replaceAll",
          value: function replaceAll(str, oldVal, newVal) {
            return str.replace(new RegExp(oldVal, 'g'), newVal);
          }
          /**
           * Returns a random "pretty" color.
           */

        }, {
          key: "getRandomColor",
          value: function getRandomColor() {
            return Object(randomcolor__WEBPACK_IMPORTED_MODULE_1__["randomColor"])();
          }
          /**
           * Builds cells from a Sudoku string like 1..32.. (etc.)
           */

        }, {
          key: "getCellsFromString",
          value: function getCellsFromString(sudokuStr) {
            var cells = [];

            var _iterator = _createForOfIteratorHelper(lodash__WEBPACK_IMPORTED_MODULE_0__["range"](81)),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var i = _step.value;
                cells.push(sudokuStr[i] === '.' ? '123456789' : sudokuStr[i]);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return cells;
          }
          /**
           * Calculate the sum of the already known number of a cell array.
           */

        }, {
          key: "getValueSum",
          value: function getValueSum(cells) {
            return lodash__WEBPACK_IMPORTED_MODULE_0__["sum"](cells.filter(function (c) {
              return c.getCandidates().length === 1;
            }).map(function (c) {
              return +c.getCandidates();
            }));
          }
          /**
           * Calculate the product of the already known number of a cell array.
           */

        }, {
          key: "getValueProduct",
          value: function getValueProduct(cells) {
            var filledCells = cells.filter(function (c) {
              return c.getCandidates().length === 1;
            }).map(function (c) {
              return +c.getCandidates();
            });

            if (filledCells.length === 0) {
              return 0;
            } else {
              return filledCells.reduce(function (a, b) {
                return a * b;
              }, 1);
            }
          }
          /**
           * Checks if all cells of an array are filled with one value.
           */

        }, {
          key: "allFilled",
          value: function allFilled(cells) {
            return lodash__WEBPACK_IMPORTED_MODULE_0__["every"](cells.map(function (c) {
              return c.isSolved();
            }));
          }
          /**
           * Checks if there are duplicates in a cell array.
           * Empty cells are not considered. Cells with multiple candidates are not considered.
           */

        }, {
          key: "containsDuplicates",
          value: function containsDuplicates(cells) {
            // Remove empty values
            var filledCellValues = cells.filter(function (c) {
              return c.getCandidates().length === 1;
            }).map(function (c) {
              return c.getCandidates();
            });
            return lodash__WEBPACK_IMPORTED_MODULE_0__["uniq"](filledCellValues).length !== filledCellValues.length;
          }
        }]);

        return Util;
      }();
      /***/

    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var AppComponent = function AppComponent() {
        _classCallCheck(this, AppComponent);
      };

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 6,
        vars: 0,
        consts: [[1, "subtitle"], [1, "content"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "sudoku-solver.ch");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Solve special-type Sudokus with custom constraints");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]],
        styles: [".content[_ngcontent-%COMP%] {\n  margin: auto;\n  width: 60vw;\n  min-width: 500px;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 20px;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  margin: 10px auto;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0VBQUEsdUJBQUE7RUFBQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSwwQkFBQTtFQUFBLHVCQUFBO0VBQUEsa0JBQUE7QUFDRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudCB7XG4gIG1hcmdpbjogYXV0bztcbiAgd2lkdGg6IDYwdnc7XG4gIG1pbi13aWR0aDogNTAwcHg7XG59XG5cbmgxIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xufVxuXG4uc3VidGl0bGUge1xuICBtYXJnaW46IDEwcHggYXV0bztcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xufVxuIl19 */"]
      });
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      "R1ws");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _main_main_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./main/main.component */
      "wlho");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"], _main_main_component__WEBPACK_IMPORTED_MODULE_5__["MainComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]]
        });
      })();
      /***/

    },

    /***/
    "hFCa":
    /*!*****************************************!*\
      !*** ./src/app/model/worker-message.ts ***!
      \*****************************************/

    /*! exports provided: WorkerMessage, WorkerStatus */

    /***/
    function hFCa(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "WorkerMessage", function () {
        return WorkerMessage;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "WorkerStatus", function () {
        return WorkerStatus;
      });

      var WorkerMessage = function WorkerMessage(status, content) {
        _classCallCheck(this, WorkerMessage);

        this.status = status;
        this.content = content;
      };

      var WorkerStatus;

      (function (WorkerStatus) {
        WorkerStatus[WorkerStatus["IDLE"] = 0] = "IDLE";
        WorkerStatus[WorkerStatus["INVALID"] = 1] = "INVALID";
        WorkerStatus[WorkerStatus["SOLVING"] = 2] = "SOLVING";
        WorkerStatus[WorkerStatus["SOLVED"] = 3] = "SOLVED";
        WorkerStatus[WorkerStatus["UNSOLVABLE"] = 4] = "UNSOLVABLE";
      })(WorkerStatus || (WorkerStatus = {}));
      /***/

    },

    /***/
    "hk1m":
    /*!******************************************!*\
      !*** ./src/app/model/constraint-type.ts ***!
      \******************************************/

    /*! exports provided: ConstraintType */

    /***/
    function hk1m(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ConstraintType", function () {
        return ConstraintType;
      });

      var ConstraintType;

      (function (ConstraintType) {
        ConstraintType[ConstraintType["SINGLE_CELL_ODD_EVEN"] = 0] = "SINGLE_CELL_ODD_EVEN";
        ConstraintType[ConstraintType["TWO_CELLS_BIGGER_THAN"] = 1] = "TWO_CELLS_BIGGER_THAN";
        ConstraintType[ConstraintType["TWO_CELLS_EXACT_DIFFERENCE"] = 2] = "TWO_CELLS_EXACT_DIFFERENCE";
        ConstraintType[ConstraintType["TWO_CELLS_EXACT_FACTOR"] = 3] = "TWO_CELLS_EXACT_FACTOR";
        ConstraintType[ConstraintType["MULTI_CELL_UNIT"] = 4] = "MULTI_CELL_UNIT";
        ConstraintType[ConstraintType["MULTI_CELL_SUM"] = 5] = "MULTI_CELL_SUM";
        ConstraintType[ConstraintType["MULTI_CELL_PRODUCT"] = 6] = "MULTI_CELL_PRODUCT";
      })(ConstraintType || (ConstraintType = {}));
      /***/

    },

    /***/
    "mSYY":
    /*!*************************************!*\
      !*** ./src/app/model/constraint.ts ***!
      \*************************************/

    /*! exports provided: Constraint */

    /***/
    function mSYY(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Constraint", function () {
        return Constraint;
      });
      /* harmony import */


      var _constraint_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./constraint-type */
      "hk1m");
      /* harmony import */


      var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./util */
      "M+Yo");

      var Constraint = /*#__PURE__*/function () {
        function Constraint() {
          _classCallCheck(this, Constraint);

          this.cellIds = []; // Used for SINGLE_CELL_ODD_EVEN

          this.isEven = true; // Used for MULTI_CELL_SUM (Killer Sudoku)

          this.noDuplicates = false;
          this.color = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].getRandomColor();
        }

        _createClass(Constraint, [{
          key: "toString",
          value: function toString() {
            var cellStr = this.cellIds.map(function (c) {
              return c.toString();
            }).join(', ');
            var desc = '';

            switch (this.type) {
              case _constraint_type__WEBPACK_IMPORTED_MODULE_0__["ConstraintType"].SINGLE_CELL_ODD_EVEN:
                desc = 'Cells ' + cellStr;

                if (this.isEven) {
                  desc += ' must be even';
                } else {
                  desc += ' must be odd';
                }

                break;

              case _constraint_type__WEBPACK_IMPORTED_MODULE_0__["ConstraintType"].MULTI_CELL_SUM:
                desc = 'Cells ' + cellStr + ' must add up to ' + this.sum;
                break;

              case _constraint_type__WEBPACK_IMPORTED_MODULE_0__["ConstraintType"].MULTI_CELL_UNIT:
                desc = 'Cells ' + cellStr + ' form a unit';
                break;

              case _constraint_type__WEBPACK_IMPORTED_MODULE_0__["ConstraintType"].MULTI_CELL_PRODUCT:
                desc = 'Cells ' + cellStr + ' must multiply to ' + this.product;
                break;

              case _constraint_type__WEBPACK_IMPORTED_MODULE_0__["ConstraintType"].TWO_CELLS_BIGGER_THAN:
                desc = 'First cell of ' + cellStr + ' is bigger than second';
                break;

              case _constraint_type__WEBPACK_IMPORTED_MODULE_0__["ConstraintType"].TWO_CELLS_EXACT_DIFFERENCE:
                desc = 'Cells ' + cellStr + ' have difference of ' + this.difference;
                break;

              case _constraint_type__WEBPACK_IMPORTED_MODULE_0__["ConstraintType"].TWO_CELLS_EXACT_FACTOR:
                desc = 'Cells ' + cellStr + ' have factor of ' + this.factor;
                break;
            }

            return desc;
          }
        }]);

        return Constraint;
      }();
      /***/

    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _main_main_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./main/main.component */
      "wlho");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var routes = [{
        path: '',
        component: _main_main_component__WEBPACK_IMPORTED_MODULE_1__["MainComponent"]
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        factory: function AppRoutingModule_Factory(t) {
          return new (t || AppRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes, {
          relativeLinkResolution: 'legacy'
        })], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        });
      })();
      /***/

    },

    /***/
    "wlho":
    /*!****************************************!*\
      !*** ./src/app/main/main.component.ts ***!
      \****************************************/

    /*! exports provided: MainComponent */

    /***/
    function wlho(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* WEBPACK VAR INJECTION */


      (function (__webpack__worker__0) {
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "MainComponent", function () {
          return MainComponent;
        });
        /* harmony import */


        var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! lodash */
        "LvDl");
        /* harmony import */


        var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _model_constraint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ../model/constraint */
        "mSYY");
        /* harmony import */


        var _model_constraint_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ../model/constraint-type */
        "hk1m");
        /* harmony import */


        var _model_worker_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ../model/worker-message */
        "hFCa");
        /* harmony import */


        var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! @angular/core */
        "fXoL");
        /* harmony import */


        var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! @angular/common */
        "ofXK");
        /* harmony import */


        var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
        /*! @angular/forms */
        "3Pt+");

        function MainComponent_div_5_li_3_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "input", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainComponent_div_5_li_3_Template_input_ngModelChange_1_listener($event) {
              var cell_r4 = ctx.$implicit;
              return cell_r4.value = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var cell_r4 = ctx.$implicit;

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("color", cell_r4.calculated ? "green" : "blue");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", cell_r4.value);
          }
        }

        function MainComponent_div_5_Template(rf, ctx) {
          if (rf & 1) {
            var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, MainComponent_div_5_li_3_Template, 2, 3, "li", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, " Enter the numbers which are already known. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, " For a regular Sudoku, click \"solve\" below, else add contraints by switching to the \"Add constraints\" view. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_div_5_Template_button_click_9_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);

              var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

              return ctx_r6.solve();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, " Solve ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_div_5_Template_button_click_11_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);

              var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

              return ctx_r8.clearCells();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, " Clear ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r0.cells);
          }
        }

        function MainComponent_div_6_li_3_span_1_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "span", 29);
          }

          if (rf & 2) {
            var color_r17 = ctx.$implicit;
            var i_r18 = ctx.index;

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("margin-bottom", 30 - 30 * (i_r18 % 3) + "px")("margin-right", 30 - 60 * (i_r18 - i_r18 % 3) / 3 + "px")("background", color_r17);
          }
        }

        function MainComponent_div_6_li_3_Template(rf, ctx) {
          if (rf & 1) {
            var _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_div_6_li_3_Template_li_click_0_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);

              var cell_r15 = ctx.$implicit;

              var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

              return ctx_r19.toggleSelection(cell_r15);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, MainComponent_div_6_li_3_span_1_Template, 1, 6, "span", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var cell_r15 = ctx.$implicit;

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("background-color", cell_r15.bgColor);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", cell_r15.colors);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("color", cell_r15.calculated ? "green" : "black");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", cell_r15.value, " ");
          }
        }

        function MainComponent_div_6_div_18_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 30);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Choose a constraint type to show its description. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }
        }

        function MainComponent_div_6_div_19_Template(rf, ctx) {
          if (rf & 1) {
            var _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "b");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Description:");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " One or more cells which are odd or even.");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "b");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Choose if odd/even:");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "select", 32);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainComponent_div_6_div_19_Template_select_ngModelChange_8_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);

              var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

              return ctx_r21.currentConstraint.isEven = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "option", 33);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Even");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "option", 33);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Odd");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r11.currentConstraint.isEven);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", true);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", false);
          }
        }

        function MainComponent_div_6_div_20_Template(rf, ctx) {
          if (rf & 1) {
            var _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "b");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Description:");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Multiple cells must add up to a sum.");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "b");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Enter sum:");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "input", 34);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainComponent_div_6_div_20_Template_input_ngModelChange_8_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r24);

              var ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

              return ctx_r23.currentConstraint.sum = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "input", 35);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainComponent_div_6_div_20_Template_input_ngModelChange_10_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r24);

              var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

              return ctx_r25.currentConstraint.noDuplicates = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " No duplicates (Killer Sudoku) ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r12.currentConstraint.sum);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r12.currentConstraint.noDuplicates);
          }
        }

        function MainComponent_div_6_div_21_Template(rf, ctx) {
          if (rf & 1) {
            var _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "b");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Description:");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Multiple cells form a product when multiplied.");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 36);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "b");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Enter product:");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "input", 34);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainComponent_div_6_div_21_Template_input_ngModelChange_8_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r27);

              var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

              return ctx_r26.currentConstraint.product = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r13.currentConstraint.product);
          }
        }

        function MainComponent_div_6_div_28_Template(rf, ctx) {
          if (rf & 1) {
            var _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "span", 37);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "svg", 38);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_div_6_div_28_Template__svg_svg_click_3_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r30);

              var constraint_r28 = ctx.$implicit;

              var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

              return ctx_r29.deleteConstraint(constraint_r28);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "path", 39);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "path", 40);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var constraint_r28 = ctx.$implicit;

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("background", constraint_r28.color);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", constraint_r28.toString(), " ");
          }
        }

        function MainComponent_div_6_Template(rf, ctx) {
          if (rf & 1) {
            var _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ul", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, MainComponent_div_6_li_3_Template, 4, 6, "li", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "select", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainComponent_div_6_Template_select_ngModelChange_7_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r32);

              var ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

              return ctx_r31.currentConstraint.type = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "option", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Choose constraint type");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "option", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " Odd or even cell(s) ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "option", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, " Multiple cells: Complete unit (1-9) ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "option", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, " Multiple cells: sum ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "option", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, " Multiple cells: product ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, MainComponent_div_6_div_18_Template, 2, 0, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, MainComponent_div_6_div_19_Template, 13, 3, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, MainComponent_div_6_div_20_Template, 12, 2, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, MainComponent_div_6_div_21_Template, 9, 1, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "button", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_div_6_Template_button_click_22_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r32);

              var ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

              return ctx_r33.addConstraint();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, " Add ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](24, "hr");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "b");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, "List of Constraints:");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "div", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](28, MainComponent_div_6_div_28_Template, 6, 3, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "b");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, "Global options");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "div", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "input", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainComponent_div_6_Template_input_ngModelChange_32_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r32);

              var ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

              return ctx_r34.useBlockUnits = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, " Use standard 3x3 block units ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_div_6_Template_button_click_34_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r32);

              var ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

              return ctx_r35.solve();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](35, " Solve ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.cells);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Click on cells to select them (", ctx_r1.currentConstraint.cellIds.length, " selected) ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r1.currentConstraint.type);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r1.currentConstraint.cellIds.length === 0)("ngValue", ctx_r1.constraintTypeEnum.SINGLE_CELL_ODD_EVEN);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r1.currentConstraint.cellIds.length !== 9)("ngValue", ctx_r1.constraintTypeEnum.MULTI_CELL_UNIT);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r1.currentConstraint.cellIds.length < 2)("ngValue", ctx_r1.constraintTypeEnum.MULTI_CELL_SUM);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r1.currentConstraint.cellIds.length < 2)("ngValue", ctx_r1.constraintTypeEnum.MULTI_CELL_PRODUCT);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.currentConstraint.type === undefined);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.currentConstraint.type === ctx_r1.constraintTypeEnum.SINGLE_CELL_ODD_EVEN);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.currentConstraint.type === ctx_r1.constraintTypeEnum.MULTI_CELL_SUM);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.currentConstraint.type === ctx_r1.constraintTypeEnum.MULTI_CELL_PRODUCT);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r1.currentConstraint.cellIds.length === 0 || ctx_r1.currentConstraint.type === undefined);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.constraints);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r1.useBlockUnits);
          }
        }

        function MainComponent_div_7_li_3_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "input", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainComponent_div_7_li_3_Template_input_ngModelChange_1_listener($event) {
              var cell_r39 = ctx.$implicit;
              return cell_r39.value = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var cell_r39 = ctx.$implicit;

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("color", cell_r39.calculated ? "green" : "blue");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", cell_r39.value);
          }
        }

        function MainComponent_div_7_div_7_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div", 43);
          }
        }

        function MainComponent_div_7_button_8_Template(rf, ctx) {
          if (rf & 1) {
            var _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_div_7_button_8_Template_button_click_0_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r42);

              var ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

              return ctx_r41.clearAll();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Clear ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }
        }

        function MainComponent_div_7_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, MainComponent_div_7_li_3_Template, 2, 3, "li", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, MainComponent_div_7_div_7_Template, 1, 0, "div", 41);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, MainComponent_div_7_button_8_Template, 2, 0, "button", 42);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.cells);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Status: ", ctx_r2.status, " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r2.solvingInProgress);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r2.solvingInProgress);
          }
        }

        var ViewMode;

        (function (ViewMode) {
          ViewMode[ViewMode["numbers"] = 0] = "numbers";
          ViewMode[ViewMode["constraints"] = 1] = "constraints";
          ViewMode[ViewMode["solving"] = 2] = "solving";
        })(ViewMode || (ViewMode = {}));

        var GridCell = function GridCell(cellId) {
          _classCallCheck(this, GridCell);

          this.value = '';
          this.bgColor = 'white';
          this.colors = [];
          this.cellId = cellId;
        };

        var MainComponent = /*#__PURE__*/function () {
          function MainComponent() {
            _classCallCheck(this, MainComponent);

            this.viewModeEnum = ViewMode;
            this.constraintTypeEnum = _model_constraint_type__WEBPACK_IMPORTED_MODULE_2__["ConstraintType"];
            this.viewMode = ViewMode.numbers;
            this.cells = [];
            this.currentConstraint = new _model_constraint__WEBPACK_IMPORTED_MODULE_1__["Constraint"]();
            this.constraints = [];
            this.useBlockUnits = true;
            this.status = '';
            this.solvingInProgress = false;
          }

          _createClass(MainComponent, [{
            key: "ngOnInit",
            value: function ngOnInit() {
              this.cells = lodash__WEBPACK_IMPORTED_MODULE_0__["range"](81).map(function (i) {
                return new GridCell(i);
              });
              var sudokuStr = '.1......86....57..3....6.4.8...4.27.........5.74.6.....3.....9...79.....2...1..5.';

              var _iterator2 = _createForOfIteratorHelper(lodash__WEBPACK_IMPORTED_MODULE_0__["range"](81)),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var i = _step2.value;
                  this.cells[i].value = sudokuStr[i] === '.' ? '' : sudokuStr[i];
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          }, {
            key: "setViewMode",
            value: function setViewMode(viewMode) {
              if (this.viewMode === ViewMode.solving) {
                this.clearAll();
              }

              this.viewMode = viewMode;
            }
          }, {
            key: "toggleSelection",
            value: function toggleSelection(cell) {
              if (this.currentConstraint.cellIds.includes(cell.cellId)) {
                this.currentConstraint.cellIds = this.currentConstraint.cellIds.filter(function (c) {
                  return c !== cell.cellId;
                });
                cell.bgColor = 'white';
              } else {
                this.currentConstraint.cellIds.push(cell.cellId);
                cell.bgColor = this.currentConstraint.color;
              }
            }
          }, {
            key: "addConstraint",
            value: function addConstraint() {
              var _this = this;

              console.log('Adding constraint:', this.currentConstraint);
              this.constraints.push(this.currentConstraint);
              var savedType = this.currentConstraint.type; // On every marked cell, add color dot

              this.cells.filter(function (c) {
                return _this.currentConstraint.cellIds.includes(c.cellId);
              }).forEach(function (c) {
                console.log('Pushing color', _this.currentConstraint.color, 'to c:', c.cellId);
                c.colors.push(_this.currentConstraint.color);
              });
              this.currentConstraint = new _model_constraint__WEBPACK_IMPORTED_MODULE_1__["Constraint"]();
              this.currentConstraint.type = savedType;
              this.resetSelection();
            }
          }, {
            key: "deleteConstraint",
            value: function deleteConstraint(constraint) {
              this.constraints = this.constraints.filter(function (c) {
                return c !== constraint;
              });
              this.cells.forEach(function (c) {
                return c.colors = c.colors.filter(function (col) {
                  return col !== constraint.color;
                });
              });
            }
          }, {
            key: "clearCells",
            value: function clearCells() {
              this.cells.forEach(function (cell) {
                cell.value = '';
                cell.colors = [];
              });
              this.viewMode = ViewMode.numbers;
            }
          }, {
            key: "clearConstraints",
            value: function clearConstraints() {
              this.constraints = [];
            }
          }, {
            key: "clearAll",
            value: function clearAll() {
              this.clearCells();
              this.clearConstraints();
            }
          }, {
            key: "resetSelection",
            value: function resetSelection() {
              this.cells.forEach(function (cell) {
                return cell.bgColor = 'white';
              });
            }
          }, {
            key: "solve",
            value: function solve() {
              var _this2 = this;

              this.resetSelection();
              this.setViewMode(ViewMode.solving);
              this.status = 'Solving...';
              this.solvingInProgress = true; // Create a new worker

              var worker = new Worker(__webpack__worker__0, undefined);

              worker.onmessage = function (event) {
                console.log("MainComponent got worker message: ".concat(event.data, "!"));
                var message = event.data;

                switch (message.status) {
                  case _model_worker_message__WEBPACK_IMPORTED_MODULE_3__["WorkerStatus"].SOLVED:
                    _this2.adaptSolution(message.content);

                    _this2.status = "Solved!";
                    _this2.solvingInProgress = false;
                    worker.terminate();
                    break;

                  case _model_worker_message__WEBPACK_IMPORTED_MODULE_3__["WorkerStatus"].SOLVING:
                    _this2.status = 'Solving: ' + message.content;
                    break;

                  case _model_worker_message__WEBPACK_IMPORTED_MODULE_3__["WorkerStatus"].INVALID:
                  case _model_worker_message__WEBPACK_IMPORTED_MODULE_3__["WorkerStatus"].UNSOLVABLE:
                    worker.terminate();
                    _this2.solvingInProgress = false;
                    _this2.status = 'Sudoku not solvable!';
                    break;
                }
              };

              var sudokuOptions = {
                cells: this.cells.map(function (c) {
                  return c.value;
                }),
                constraints: this.constraints,
                globalOptions: {
                  useBlockUnits: true
                }
              };
              worker.postMessage(sudokuOptions);
            }
          }, {
            key: "adaptSolution",
            value: function adaptSolution(sudokuStr) {
              // Set values on cells
              var _iterator3 = _createForOfIteratorHelper(lodash__WEBPACK_IMPORTED_MODULE_0__["range"](81)),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var i = _step3.value;
                  var cell = this.cells[i];

                  if (cell.value === '') {
                    cell.calculated = true;
                    cell.value = sudokuStr[i];
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          }]);

          return MainComponent;
        }();

        MainComponent.ɵfac = function MainComponent_Factory(t) {
          return new (t || MainComponent)();
        };

        MainComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
          type: MainComponent,
          selectors: [["app-main"]],
          decls: 60,
          vars: 7,
          consts: [["role", "group", 1, "toggle-buttons", "btn-group"], ["type", "button", 1, "btn", "btn-outline-dark", 3, "click"], ["class", "flex-container", 4, "ngIf"], [1, "showcase"], ["href", "https://norvig.com/sudoku.html"], ["href", "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"], ["href", "https://github.com/akleemans/sudoku-solver.ch"], ["href", "https://codepen.io/sdobson"], ["href", "https://github.com/davidmerfield/randomColor"], [2, "margin-bottom", "50px"], ["href", "https://www.kleemans.ch"], [1, "flex-container"], [1, "grid", "left-side"], [4, "ngFor", "ngForOf"], [1, "right-side"], ["type", "text", "maxlength", "1", "autocomplete", "false", 3, "ngModel", "ngModelChange"], [2, "cursor", "pointer"], [3, "background-color", "click", 4, "ngFor", "ngForOf"], [1, "custom-select", 3, "ngModel", "ngModelChange"], ["selected", ""], [3, "disabled", "ngValue"], ["style", "height: 100px;", 4, "ngIf"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-outline-dark", 3, "disabled", "click"], [1, "constraint-list"], [2, "margin-bottom", "20px"], ["type", "checkbox", 3, "ngModel", "ngModelChange"], [3, "click"], ["class", "smalldot", 3, "margin-bottom", "margin-right", "background", 4, "ngFor", "ngForOf"], [1, "smalldot"], [2, "height", "100px"], [1, "form-inline"], [1, "form-control", "custom-select", 3, "ngModel", "ngModelChange"], [3, "value"], ["type", "number", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "checkbox", 1, "form-control", 2, "margin-right", "5px", 3, "ngModel", "ngModelChange"], [1, "form-inline", 2, "margin-bottom", "10px"], [1, "mydot"], ["width", "1em", "height", "1em", "viewBox", "0 0 16 16", "fill", "currentColor", "xmlns", "http://www.w3.org/2000/svg", 1, "bi", "bi-trash", 2, "cursor", "pointer", 3, "click"], ["d", "M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"], ["fill-rule", "evenodd", "d", "M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z", "clip-rule", "evenodd"], ["class", "spinner-border", "role", "status", 4, "ngIf"], ["type", "button", "class", "btn btn-outline-dark", 3, "click", 4, "ngIf"], ["role", "status", 1, "spinner-border"]],
          template: function MainComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 1);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_Template_button_click_1_listener() {
                return ctx.setViewMode(ctx.viewModeEnum.numbers);
              });

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, " Enter numbers ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 1);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MainComponent_Template_button_click_3_listener() {
                return ctx.setViewMode(ctx.viewModeEnum.constraints);
              });

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Add constraints ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, MainComponent_div_5_Template, 13, 1, "div", 2);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, MainComponent_div_6_Template, 36, 18, "div", 2);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, MainComponent_div_7_Template, 9, 4, "div", 2);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 3);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " This webapp lets you solve custom Sudokus, and a wide range of known 9x9 Sudoku types: ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ul");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "li");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "b");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Sudoku X");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, ": Two additional diagonal units ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "li");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "b");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Hyper Sudoku");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, ": Four additional units ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "li");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "b");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Killer Sudoku (Sum Sudoku)");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, ": Regions of variable size must form sums ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "li");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "b");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Nonomino");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, ": No 3x3 block units, but 9 custom, irregular units instead ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "li");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "b");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29, "Odd-Even Sudoku");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, ": Normal Sudoku with odd/even constraints ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "li");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, " Custom combinations of the above (for example special Sudokus for Geocaching puzzles) ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "h3");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34, "Technical details");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "p");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](36, " The solver is based on backtracking as described by ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "a", 4);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](38, "Peter Norvig");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39, ". It uses custom constraints for propagation and a different heuristic (based on the entered constraints) to optimize the search. The solving is done inside of a ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "a", 5);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](41, " Web Worker");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](42, ". ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "p");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44, " The solver is open source (MIT license) and available on ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "a", 6);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](46, "Github");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, ". ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "p");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, " The grid is based on the work of ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "a", 7);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](51, "Sam Dobson");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](52, ". The random colors are generated by ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](53, "a", 8);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](54, "randomColor");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](55, ". ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "p", 9);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](57, " \xA9 2021 by ");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "a", 10);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59, "Adrianus Kleemans");

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
            }

            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("active", ctx.viewMode === ctx.viewModeEnum.numbers);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("active", ctx.viewMode === ctx.viewModeEnum.constraints);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === ctx.viewModeEnum.numbers);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === ctx.viewModeEnum.constraints);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

              _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === ctx.viewModeEnum.solving);
            }
          },
          directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NumberValueAccessor"]],
          styles: [".grid[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(9, 50px);\n  grid-template-rows: repeat(9, 50px);\n  grid-gap: 0;\n  list-style: none;\n  margin: 0 0 2vw;\n  padding: 0;\n  font-size: 31px;\n}\n.grid[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(n):nth-child(-n+9) {\n  border-top-width: 4px;\n}\n.grid[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(n+73):nth-child(-n+81) {\n  border-bottom-width: 4px;\n}\n.grid[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3n) {\n  border-right-width: 4px;\n}\n.grid[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9n+1) {\n  border-left-width: 4px;\n}\n.grid[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(n+19):nth-child(-n+27) {\n  border-bottom-width: 4px;\n}\n.grid[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(n+46):nth-child(-n+54) {\n  border-bottom-width: 4px;\n}\n.grid[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  text-align: center;\n  border: 1px solid black;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.grid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 43px;\n  height: 43px;\n  border: 0;\n  text-align: center;\n  font-size: 31px;\n}\n.toggle-buttons[_ngcontent-%COMP%] {\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 20px;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n  display: block;\n}\n.flex-container[_ngcontent-%COMP%] {\n  display: flex;\n}\n.left-side[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n.flex-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n  margin-right: 10px;\n}\n.flex-container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.mydot[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  display: inline-block;\n  height: 15px;\n  width: 15px;\n  margin-left: 4px;\n  margin-right: 4px;\n  margin-bottom: -2px;\n}\n.smalldot[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  display: inline-block;\n  height: 8px;\n  width: 8px;\n  position: absolute;\n}\n.constraint-list[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  min-height: 20px;\n  max-height: 100px;\n  overflow-y: scroll;\n  border: 1px dotted black;\n}\n.form-inline[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n.right-side[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL21haW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxhQUFBO0VBQ0Esc0NBQUE7RUFDQSxtQ0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtBQUFKO0FBR0U7RUFDRSxxQkFBQTtBQURKO0FBSUU7RUFDRSx3QkFBQTtBQUZKO0FBS0U7RUFDRSx1QkFBQTtBQUhKO0FBTUU7RUFDRSxzQkFBQTtBQUpKO0FBT0U7RUFDRSx3QkFBQTtBQUxKO0FBUUU7RUFDRSx3QkFBQTtBQU5KO0FBU0U7RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQVBKO0FBVUU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFSSjtBQVlBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMEJBQUE7RUFBQSx1QkFBQTtFQUFBLGtCQUFBO0VBQ0EsY0FBQTtBQVRGO0FBWUE7RUFDRSxhQUFBO0FBVEY7QUFZQTtFQUNFLGtCQUFBO0FBVEY7QUFhRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUFWSjtBQWFFO0VBQ0UsbUJBQUE7QUFYSjtBQW1CQTtFQUNFLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQWhCRjtBQW1CQTtFQUNFLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0FBaEJGO0FBbUJBO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx3QkFBQTtBQWhCRjtBQW1CQTtFQUNFLGtCQUFBO0FBaEJGO0FBbUJBO0VBQ0UsZ0JBQUE7QUFoQkYiLCJmaWxlIjoibWFpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ncmlkIHtcbiAgdWwge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgNTBweCk7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgNTBweCk7XG4gICAgZ3JpZC1nYXA6IDA7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBtYXJnaW46IDAgMCAydnc7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXNpemU6IDMxcHg7XG4gIH1cblxuICBsaTpudGgtY2hpbGQobik6bnRoLWNoaWxkKC1uKzkpIHtcbiAgICBib3JkZXItdG9wLXdpZHRoOiA0cHg7XG4gIH1cblxuICBsaTpudGgtY2hpbGQobis3Myk6bnRoLWNoaWxkKC1uKzgxKSB7XG4gICAgYm9yZGVyLWJvdHRvbS13aWR0aDogNHB4O1xuICB9XG5cbiAgbGk6bnRoLWNoaWxkKDNuKSB7XG4gICAgYm9yZGVyLXJpZ2h0LXdpZHRoOiA0cHg7XG4gIH1cblxuICBsaTpudGgtY2hpbGQoOW4rMSkge1xuICAgIGJvcmRlci1sZWZ0LXdpZHRoOiA0cHg7XG4gIH1cblxuICBsaTpudGgtY2hpbGQobisxOSk6bnRoLWNoaWxkKC1uKzI3KSB7XG4gICAgYm9yZGVyLWJvdHRvbS13aWR0aDogNHB4O1xuICB9XG5cbiAgbGk6bnRoLWNoaWxkKG4rNDYpOm50aC1jaGlsZCgtbis1NCkge1xuICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDRweDtcbiAgfVxuXG4gIGxpIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG5cbiAgaW5wdXQge1xuICAgIHdpZHRoOiA0M3B4O1xuICAgIGhlaWdodDogNDNweDtcbiAgICBib3JkZXI6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMzFweDtcbiAgfVxufVxuXG4udG9nZ2xlLWJ1dHRvbnMge1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uZmxleC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4ubGVmdC1zaWRlIHtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuXG4uZmxleC1jb250YWluZXIge1xuICBidXR0b24ge1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIH1cblxuICBzZWxlY3Qge1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIH1cbn1cblxuLnNob3djYXNlIHtcbiAgLy8gdWwsIGxpXG59XG5cbi5teWRvdCB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBoZWlnaHQ6IDE1cHg7XG4gIHdpZHRoOiAxNXB4O1xuICBtYXJnaW4tbGVmdDogNHB4O1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgbWFyZ2luLWJvdHRvbTogLTJweDtcbn1cblxuLnNtYWxsZG90IHtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogOHB4O1xuICB3aWR0aDogOHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5jb25zdHJhaW50LWxpc3Qge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBtaW4taGVpZ2h0OiAyMHB4O1xuICBtYXgtaGVpZ2h0OiAxMDBweDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG59XG5cbi5mb3JtLWlubGluZSBiIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4ucmlnaHQtc2lkZSB7XG4gIG1pbi13aWR0aDogMjAwcHg7XG59XG4iXX0= */"]
        });
        /* WEBPACK VAR INJECTION */
      }).call(this, __webpack_require__(
      /*! ./node_modules/worker-plugin/dist/loader.js?name=0!./main.worker */
      "z7d2"));
      /***/
    },

    /***/
    "z7d2":
    /*!****************************************************************************************!*\
      !*** ./node_modules/worker-plugin/dist/loader.js?name=0!./src/app/main/main.worker.ts ***!
      \****************************************************************************************/

    /*! no static exports found */

    /***/
    function z7d2(module, exports, __webpack_require__) {
      module.exports = __webpack_require__.p + "0-es5.worker.js";
      /***/
    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map