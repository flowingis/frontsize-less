frontsize
=========

It's a CSS front end framework written to make websites easy to read on every device and faster to be coded. It gives to the developer a solid base which can be used to build responsive layouts for websites or web apps.

Documentation is [in progress](https://github.com/ideatosrl/frontsize-doc/blob/master/wiki/README.md) and *far to be completed* but the best doc is the code itself, isn't it?

Next release
---

**Features**
- **added** fallback color support to background gradient helpers
- **added** `min-width` param to `addViewportsSteps` mixin to let disabled media queries works better
- **added** the possibility to set `font-family` on input placeholder attributes with `globalPlaceholder` and `input-placeholder` mixins
- **added** `UTF8` charset encoding declaration

**Optimization**
- **moved** out adjoining classes for `.fixed` and `.absolute` state selectors
- **semplified** `glossGradient` colors not properly applied
- **disabled** text selection to `.disabled` selector
- **added** `@forcePrefixes` to `font-smoothing` to prevent the property to be skipped from `autoprefixer`
- **added** `@forcePrefixes` to `appearance` to prevent the property to be skipped from `autoprefixer`
- **semplified** nav list state selectors
- **added** `border-box` to `.size` mixin ensure a more precise sizing

**Fix**
- **added** `z-index` fix to `.fixed` and `.absolute` to ensure the element to be over it's siblings
- **renamed** an undefined var if `@root-path` is set to `true`
- **fixed** `spritePosition` helper with right number of values on `background-position` property
- **fixed** fallback colors for `verticalGradient`, `verticalGradientColors` and `glossGradient` mixins
- **added** missing `ieVerticalGradient` mixin inside `glossGradient` mixin
- **added** `relative` position to `body` to work better with children absolute positioning
- **added** missing `@important` to `.no-line-height`
- **fixed** selector `table-inline` to be more consistent
- **fixed** horizontal `margin` to `auto` to avoid `margin-top` and `margin-bottom` to be overridden
- **fixed** `ul` on core base now has it's default `display` property value

Version 1.3.3
---

**Features**
- **all** [CSSlint](https://github.com/stubbornella/csslint/) tests based on [.csslintrc](https://github.com/ideatosrl/frontsize-less/blob/master/.csslintrc) configuration successfully pass
- **added** `fallbackColor` mixin to help compatibility
- **added** app configuration var `@use-fallback-colors` to enable or disable mixin `fallbackColor`
- helpers are now **better organized** on core and themes like widgets

**Optimization**
- **enabled** `fallback-colors` test with [CSSlint](https://github.com/stubbornella/csslint/)
- **changed** all passed `rgba` colors to properties now using `fallbackColor` mixin to add compatibility to older browsers (ie)

**Bug fixes**
- **code indentation** on core prefixes
- **changed** `css` folder to `test` to avoid *css* usage misunderstanding
- **removed** `normalize.css` from tests
- **fixed** mixin `ieVerticalGradient` from a recursive variable definition

For developers
--------------
There's a lot of css selectors to let the developer work without loosing time on responsive development, with simple rules built to create smooth applications easy to be extended.

For designers
-------------
It's a useful tool for the designer who like to build a website reusing his design assets with the power of the customization on demand, directly through state selectors on templates.

Theme ready
-----------
Frontsize is designed to create modular and flexible themes easy to be changed, moved and updated with the latest core available.

Make love, not war
------------------
Frontsize supports both LESS and SASS, because they are nice, and you'll choose the best preprocessor.
Take a closer look to the repos on GitHub where you can report issues and pull requests.

Mobile first
------------
You'll find CSS selectors which can help you to build a perfectly reliable website from a smartphone to the big screen. There are media queries for every approach, two for mobile first, and one for traditional approach. You choose.

Configurable
------------
You can change your CSS app settings in every moment and have full control of your website padding, fonts styles, media query rules, grids configuration and behavior and see what CSS are included in your application. And much more.

Widgets + Helpers
-----------------
Widgets are CSS components, built to work alone and easy to be recycled arount your visual app, Helpers are mixins of CSS properties useful to let you write less code but more consistent. Frontsize will help you to be extended with your ones.

Community based
---------------
The project could be mantained by you too. You can create tons of useful widgets and helpers inside the community, then, everyone can choose to use them inside their Frontsize app with a click.


created by [Vittorio Vittori](https://twitter.com/vttrx) and [Alessandro Minoccheri](https://twitter.com/minompi), sponsored by [ideato](http://www.ideato.it)
