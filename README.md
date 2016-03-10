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
Usage:marcelb [OPTIONS] <name>
	-h, --help        		show this help screen
	setup     	  			installation 
	front     	  			start with front environnement( front logs )
	back     	  			start with back environnement( express logs )
	grunt (command) 		grunt command
	vagrant-update          update vagrant 
	--cmd "(command)"  		execute shell command to the virtual machine

Examples:
	marcelb front
	marcelb back
```

##### 2.2.2 installation 

```sh
$ cd monprojet
$ marcelb setup
```