import { Vue2, App } from "vue-demi";

/** create a `v-svgWheel` directive for a Vue app, allows the user to control the zoom in and out of an SVG image using the mouse wheel. */
export function svgWheel(app: typeof Vue2): void;
/** create a `v-svgWheel` directive for a Vue app, allows the user to control the zoom in and out of an SVG image using the mouse wheel. */
export function svgWheel(app: App<Element>): void;
// Control the zoom in and out of an SVG image by setting the viewbox attribute of the SVG element. The third parameter of the viewbox controls the horizontal size, while the fourth parameter sets the vertical size.
export function svgWheel(app: typeof Vue2 | App<Element>) {
  app.directive("svgWheel", (el: HTMLElement) => {
    if (el) {
      el.onwheel = (e: WheelEvent) => {
        // Because the SVG is rendered using v-html, the child element of the bound DOM is the SVG element.
        const svgDom = el.firstChild as SVGSVGElement;
        const viewBox = svgDom.getAttribute("viewBox") as string;
        const [x, y, width, height] = viewBox.split(/\s+/).map(parseFloat);
        // event.wheelDelta has been deprecated, use event.deltaY instead.
        // event.deltaY returns a positive value when scrolling downwards and a negative value when scrolling upwards. Otherwise, it is 0. event.wheelDelta is the opposite.
        const scaleDelta = e.deltaY > 0 ? 0.9 : 1.1; // Zoom scale.
        const newWidth = width * scaleDelta;
        const newHeight = height * scaleDelta;
        // Calculate the centering offset.
        const dx = (width - newWidth) / 2;
        const dy = (height - newHeight) / 2;
        const newViewBox = `${x + dx} ${y + dy} ${newWidth} ${newHeight}`;
        svgDom.setAttribute("viewBox", newViewBox);
      };
    }
  });
}

/** create a `v-svgDrag` directive for a Vue app, allows the user to drag the SVG image by holding down the mouse and moving the cursor.
 */
export function svgDrag(app: typeof Vue2): void;
/** create a `v-svgDrag` directive for a Vue app, allows the user to drag the SVG image by holding down the mouse and moving the cursor.
 */
export function svgDrag(app: App<Element>): void;
// Control the drag of an SVG image by setting the "viewBox" attribute of the SVG element. The first parameter of "viewBox" controls the left-right position, and the second parameter sets the up-down position.
export function svgDrag(app: typeof Vue2 | App<Element>) {
  app.directive("svgDrag", (el: HTMLElement) => {
    let clientX = 0; // The last x-axis position of the mouse
    let clientY = 0; // The last y-axis position of the mouse
    let debounce = true; // Throttling is necessary, otherwise the dragging effect will appear jerky
    let isStartMoveSvg = false; // Whether to start dragging
    let ratio = 1; // The ratio of drag speed to size
    let sgvDom: SVGAElement; // The SVG element
    let viewBox: string; // The "viewBox" attribute of the SVG element
    let arrPoint: number[]; // The value of the "viewBox" attribute of the SVG element
    // Mouse down means start moving
    el.onmousedown = () => {
      isStartMoveSvg = true;
      const width = el.getBoundingClientRect().width;
      // Because the SVG is rendered using "v-html", the child element of the bound command DOM is the SVG element
      sgvDom = el.firstChild as SVGAElement;
      viewBox = sgvDom.getAttribute("viewBox") as string;
      arrPoint = viewBox.split(/\s+/).map(parseFloat);
      // Dynamically adjust the drag speed based on the size, otherwise it becomes harder to drag as the SVG becomes smaller
      ratio = arrPoint[2] / width;
      if (ratio < 1) ratio = 1;
    };
    // Mouse up means end moving
    el.onmouseup = () => {
      isStartMoveSvg = false;
      clientX = 0;
      clientY = 0;
    };
    // Dynamically set "viewBox" while moving
    el.onmousemove = (e: MouseEvent) => {
      if (debounce) {
        debounce = false;
        if (isStartMoveSvg) {
          if (clientX !== 0 && clientY !== 0) {
            arrPoint[0] = arrPoint[0] - (e.clientX - clientX) * ratio;
            arrPoint[1] = arrPoint[1] - (e.clientY - clientY) * ratio;
            sgvDom.setAttribute("viewBox", arrPoint.join(" "));
          }
          clientX = e.clientX;
          clientY = e.clientY;
        }
        setTimeout(() => {
          debounce = true;
        }, 50);
      }
    };
  });
}
