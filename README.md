## Boilerplate BackBone/ExpressJS
1.0

## UTILISATION DE GITBASH OBLIGATOIRE SUR WINDOWS

### 1. initialisation d'une machine virtuelle

Instruction ici : [Installation de Machine Virtuelle](http://gitlab.marceldev.fr/website/vagrant-nodejs-nginx-mongodb)


### 2. création du projet

#### 2.1 clonage du repository 

cloner le projet dans le workspace node défini lors de l'installation de la VM (par default: ~/nodejs_workspace)

```sh
$ git clone git@gitlab.marceldev.fr:website/boilerplate-backbone-rjs-expressjs.git monprojet
```

#### 2.2 installation du projet

##### 2.2.1 New Command Line

```sh
Usage:backbone [OPTIONS] <name>
	-h, --help        		show this help screen
	setup     	  			installation 
	--cmd "<shellcommand>"  execute shell command to the virtual machine
	pm2    					pm2 command
	grunt (command) 		grunt command
	vagrant-update

Examples:
	--cmd "express start"
	--cmd "pm2 logs"
```

##### 2.2.2 installation 

```sh
$ cd monprojet
$ backbone setup
```