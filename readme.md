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

## SFTP Deployment ##

1. Update your host and remote path in the deploy task, near the bottom of the gulpfile
2. Update your SFTP username and password in the .ftppass file
3. Add .ftppass to .gitignore to keep it out of version control

Run `gulp deploy` to upload the /dist folder to the server.
