# GiftRegistry

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.







## Build container
Build the program from gift-registry-api and push changes.
clone the repository on the vm
sudo docker build . --tag gift-registry-api

## Google Cloud Free Tier
Create a new compute engine 

### Promote the vm's external ephemereal IP address to static
Go to the External IP addresses page.
Go to External IP addresses
In the same row as the IP address that you want to promote to static, click Reserve.
Provide a name for the new static IP address and click Reserve.

### Install Docker
--------- https://docs.docker.com/engine/install/debian/
https://knowledgebase.aridhia.io/workspaces/analysing-data/virtual-machines/installing-software-on-virtual-machines/installing-docker-on-your-virtual-machine 

### Clone Registry
In gift-registry-ui run $ npm run build
it will build into gift-registry-api, then push the api to github
in the vm $ git clone https://github.com/ClaireMcA/gift-registry-api.git
navigate to the directory with the dockerfile and $ sudo docker build . --tag gift-registry-api


### Install certbot 
Follow these instructions to install certbot with pip. https://certbot.eff.org/instructions?ws=other&os=pip
-------- sudo apt install certbot
Use the standalone manual challenge to get the certificates. Make sure you have mapped your domain name to the ip of the server you are running the command on
$ sudo certbot certonly --standalone --preferred-challenges http -d mikaylaandconnor.com

To run mongodb so you can connect to it
You need to add a TCP firewall rule for port 27017, you can use source ip of 0.0.0.0/0 or your computer ip
You can run the database with --bind_ip_all flag to make it accessible (after mongo in the command)

