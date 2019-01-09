# Syncthetic Angular Electron
> Quick boostrapping for [Angular](https://github.com/angular/angular) and [Electron](https://github.com/electron/electron). Automatic updates are supplied with [ElectronAutoUpdate](https://github.com/Syncthetic/ElectronAutoUpdate) if you publish and point the `UpdateService` to an [ElectronAutoUpdateAPI](https://github.com/Syncthetic/ElectronAutoUpdateAPI)

# Getting started
Clone the repository and install dependancies

`git clone https://github.com/Syncthetic/syncthetic-angular-electron && cd syncthetic-angular-electron && npm i`

##### Important!
Update the `package.json` file with your application information and author information, that would be this portion. This is necessary, as the `UpdateService` will pull the package name and version from `package.json` when attempting to find if new versions have been released.

```javascript
{
  "name": "syncthetic-angular-electron",
  "version": "0.0.1",
  "description": "Boostrap angular and electron with auto-updates and clarity",
  "homepage": "https://github.com/Syncthetic/syncthetic-angular-electron",
  "author": {
    "name": "Justin Bess",
    "email": "code@justinbess.com"
  },
```

# Configure the `UpdateService`
Open and edit the service located at `src/app/services/update/update.service.ts`
On line `22` and `23`, set the `apiDomain` and `apiBase`

```javascript
  private apiDomain: string = http://api.my-website.com/
  private apiBase: string = 'api/'
 ```
 
 The above would issue a query to `http://api.my-website.com/api/application/application-name`, which if configured correctly as an [ElectronAutoUpdateAPI](https://github.com/Syncthetic/ElectronAutoUpdateAPI), will allow you to pull the applications latest information from the database.
 
 # Optional Configuration
 A top level alert notification is rendered for application updates. You can configure the component and view for the alerts in the `src/app/components/alerts` folder
 
 # Useful Tools
 #### [ElectronAutoUpdateClient](https://github.com/Syncthetic/ElectronAutoUpdateCLient)
> If you use MongoDB Stitch for your application, you can simply login with this application to manage all of your applications. i.e, change version information which causes applications using ElectronAutoUpdate to fire events if it's outdated.