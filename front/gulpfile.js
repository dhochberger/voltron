const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  // this is to add Voltron licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Voltron (http://www.creative-tim.com)

* Coded by Voltron

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Voltron licenses in the production mode for the minified js
  gulp
    .src("build/static/js/runtime*.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

  =========================================================
  * Now UI Dashboard React - v1.5.0
  =========================================================

  * Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
  * Copyright 2021 Voltron (http://www.creative-tim.com)

  * Coded by Voltron

  =========================================================

  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  */`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Voltron licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Voltron (http://www.creative-tim.com)

* Coded by Voltron

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Voltron licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Voltron (http://www.creative-tim.com)

* Coded by Voltron

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
