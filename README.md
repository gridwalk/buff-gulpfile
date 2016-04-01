```
██████╗ ██╗   ██╗███████╗███████╗                            
██╔══██╗██║   ██║██╔════╝██╔════╝                            
██████╔╝██║   ██║█████╗  █████╗                              
██╔══██╗██║   ██║██╔══╝  ██╔══╝                              
██████╔╝╚██████╔╝██║     ██║                                 
╚═════╝  ╚═════╝ ╚═╝     ╚═╝                                 
																														 
 ██████╗ ██╗   ██╗██╗     ██████╗ ███████╗██╗██╗     ███████╗
██╔════╝ ██║   ██║██║     ██╔══██╗██╔════╝██║██║     ██╔════╝
██║  ███╗██║   ██║██║     ██████╔╝█████╗  ██║██║     █████╗  
██║   ██║██║   ██║██║     ██╔═══╝ ██╔══╝  ██║██║     ██╔══╝  
╚██████╔╝╚██████╔╝███████╗██║     ██║     ██║███████╗███████╗
 ╚═════╝  ╚═════╝ ╚══════╝╚═╝     ╚═╝     ╚═╝╚══════╝╚══════╝
																														 
```

> a project template.

## Workspace Initialization ##

1. npm install --loglevel silly
2. gulp

I recommend to set `--loglevel silly` because there are a lot of packages to install and this helps you know that it's not getting stuck and it looks cool.

## Development Workflow ##

Run gulp, and the browser should open to the homepage. Make sure you have the [LiveReload Chrome Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) installed. Develop normally and the browser should keep pace with you.

## Partials ##

This project template uses Handlebars for templating. You can save HTML partials in `/src/html/partials` and embed them in html pages like so:

```
{{> header}}
```

## Pages ##

HTML pages should be saved in `/src/html/pages`. When you run gulp all pages will be compiled and sent to the `/dist` directory.

## SVGs ##

SVGs are stored as template variables, so you should add SVGs to the JSON in `src/img/svgs.json`, and embed them in your markup just like so:

```
{{{svgs.hamburger}}}
```

Note the triple brackets- this makes the variable render as HTML rather than escaped characters, which is essential for rendering inline SVG.

## Analytics##

1. Update the value of `siteURL` near the top of the gulpfile. (Also used for the sitemap)
2. Inside the HTML task replace `UA-12345678-1` with your Google Analytics UID.

Or optionally comment out that line if you're not using GA.
