
frontsize
=========



##Global vars

###Horizontal padding `@horizontal-padding`
This var will affect all **Frontsize** column sets horizontal padding.


Paramter name | Type | Default | Description
--- | --- | --- | ---
`@horizontal-padding` | *em, px, pt* | `1em` | For a better responsive layout, the recommended unit in `em`.

Usage:

```css
// this vars are located on the top of the file, in the configuration area
@horizontal-padding:1em;
```

***

###Vertical padding `@vertical-padding`
This var will affect all **Frontsize** column sets vertical padding.


Paramter name | Type | Default | Description
--- | --- | --- | ---
`@vertical-padding` | *em, px, pt* | `1em` | For a better responsive layout, the recommended unit in `em`.

Usage:

```css
@vertical-padding:1em;
```

***

###Default font `@font-default`
This var will affect the `font-family` css property of the `body` element.


Paramter name | Type | Default | Description
--- | --- | --- | ---
`@font-default` | *font families* | `'helvetica neue', helvetica, arial, sans-serif` | Write a list of font families, compound family names must be writte inside quotes as in default value example.

Usage:

```css
@font-default:'helvetica neue', helvetica, arial, sans-serif;
```

***

###Headers font `@font-h`
This var will affect the `font-family` css property of the `h1-h6` elements.


Paramter name | Type | Default | Description
--- | --- | --- | ---
`@font-h` | *font families* | `'helvetica neue', helvetica, arial, sans-serif` | Write a list of font families, compound family names must be writte inside quotes as in default value example.

Usage:

```css
@font-h:'helvetica neue', helvetica, arial, sans-serif;
```

***

###Headers font sizes `@h1` to `@h6`
This vars will affect the `font-size` css property of the `h1-h6` elements. If `.frontsize-h-font-scaling` method is set, `font-size` will change depending by the active media query.


Paramter name | Type | Default | Description
--- | --- | --- | ---
`@h1` | *em, px, pt* | `2em` | For a better responsive layout, the recommended unit in `em`.
`@h2` | *em, px, pt* | `1.5em` | For a better responsive layout, the recommended unit in `em`.
`@h3` | *em, px, pt* | `1em` | For a better responsive layout, the recommended unit in `em`.
`@h4` | *em, px, pt* | `0.9em` | For a better responsive layout, the recommended unit in `em`.
`@h5` | *em, px, pt* | `0.8em` | For a better responsive layout, the recommended unit in `em`.
`@h6` | *em, px, pt* | `0.65em` | For a better responsive layout, the recommended unit in `em`.

Usage:

```css
@h1: 2em;
@h2: 1.5em;
@h3: 1em;
@h4: 0.9em;
@h5: 0.8em;
@h6: 0.65em;
```

***

###Media queires steps, from `@smartphone-portrait-step` to `@hd-full-step`
This vars will affect **all** the media queries of **Frontsize**, you shouldn't need to chenge it's values.


Paramter name | Type | Default | Description
--- | --- | --- | ---
`@smartphone-portrait-step` | *em, px, pt* | `380px` | The easiest way is to work with `px` units.
`@smartphone-landscape-step` | *em, px, pt* | `685px` | The easiest way is to work with `px` units.
`@tablet-portrait-step` | *em, px, pt* | `768px` | The easiest way is to work with `px` units.
`@tablet-landscape-step` | *em, px, pt* | `1024px` | The easiest way is to work with `px` units.
`@hd-ready-step` | *em, px, pt* | `1280px` | The easiest way is to work with `px` units.
`@hd-full-step` | *em, px, pt* | `1800px` | The easiest way is to work with `px` units.

Usage:

```css
@smartphone-portrait-step:  380px;	// smartphones portrait		320~380
@smartphone-landscape-step: 685px;	// smartphones landscape	480~568~685
@tablet-portrait-step:	    768px;	// tabled portrait			768
@tablet-landscape-step:	   1024px;	// tabled landscape			1024
@hd-ready-step:			   1280px;	// HD Ready					1280 (720p)
@hd-full-step:			   1800px;	// Full HD					1920 (1080p)
```

***

##Init methods

###Steps margins `.frontsize-steps()`
This method will set the `max-width` css property for the css selector `.use-steps` on the media queries from **Tablet portrait** to **Full HD** resolution.


Paramter | Type | Default | Description
--- | --- | --- | ---
`@hd-full-margin` | *em, px, pt* | `200px` | This is the margin width subtracted **Full HD** resolution, this means that if you set it to `200px` with the default `@hd-full-step` of `1800px` the `max-width` of `.use-steps` selector will be `1600px`.
`@hd-ready-margin` | *em, px, pt* | `100px` | This is the margin width subtracted **HD Ready** resolution.
`@tablet-landscape-margin` | *em, px, pt* | `50px` | This is the margin width subtracted **Tablet landscape** resolution.
`@tablet-portrait-margin` | *em, px, pt* | `0px` | This is the margin width subtracted **Tablet portrait** resolution.

Usage:

```css
// default usage, just to activate it with default values
.frontsize-steps();

// custom usage to set different default values
.frontsize-steps(300px, 180px, 90px, 50px);
```

***

###Steps progressive padding `.frontsize-steps-padding()`
This method will set the `padding` css property for the css selector `.with-steps-padding`, the `padding-left / padding-right` css property for the css selector `.with-horizontal-padding` and the `padding-top / padding-bottom` css property for the css selector `.with-vertical-padding`,  on all media queries resolutions.


Paramter | Type | Default | Description
--- | --- | --- | ---
`@hd-full` | *em, px, pt* | `3em` | For a better responsive layout, the recommended unit in `em`.
`@hd-ready` | *em, px, pt* | `3em` | For a better responsive layout, the recommended unit in `em`.
`@tablet-landscape` | *em, px, pt* | `2em` | For a better responsive layout, the recommended unit in `em`.
`@tablet-portrait` | *em, px, pt* | `2em` | For a better responsive layout, the recommended unit in `em`.
`@smartphone-landscape` | *em, px, pt* | `1em` | For a better responsive layout, the recommended unit in `em`.
`@smartphone-portrait` | *em, px, pt* | `1em` | For a better responsive layout, the recommended unit in `em`.

Usage:

```css
// default usage, just to activate it with default values
.frontsize-steps-padding();

// custom usage to set different default values
.frontsize-steps-padding(4em, 3em, 2.5em, 2em, 1.5em, 1em);
```

***

###Site font scaling `.frontsize-font-scaling()`
This method will set the `padding` css property for the css selector `.with-steps-padding`, the `padding-left / padding-right` css property for the css selector `.with-horizontal-padding` and the `padding-top / padding-bottom` css property for the css selector `.with-vertical-padding`,  on all media queries resolutions.


Paramter | Type | Default | Description
--- | --- | --- | ---
`@hd-full` | *em, px, pt* | `3em` | For a better responsive layout, the recommended unit in `em`.
`@hd-ready` | *em, px, pt* | `3em` | For a better responsive layout, the recommended unit in `em`.
`@tablet-landscape` | *em, px, pt* | `2em` | For a better responsive layout, the recommended unit in `em`.
`@tablet-portrait` | *em, px, pt* | `2em` | For a better responsive layout, the recommended unit in `em`.
`@smartphone-landscape` | *em, px, pt* | `1em` | For a better responsive layout, the recommended unit in `em`.
`@smartphone-portrait` | *em, px, pt* | `1em` | For a better responsive layout, the recommended unit in `em`.

Usage:

```css
// default usage, just to activate it with default values
.frontsize-steps-padding();

// custom usage to set different default values
.frontsize-steps-padding(4em, 3em, 2.5em, 2em, 1.5em, 1em);
```

***
