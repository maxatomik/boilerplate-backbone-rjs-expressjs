## Boilerplate BackBone/ExpressJS
1.0


#### 1.1 installation des modules node indispensable
```sh
$ sudo npm install pm2 -g
```

```sh
$ sudo npm install -g grunt-cli
```


#### 1.2 installation du project builder NodeJS

Instruction ici : [NodeJS Project Builder](http://gitlab.marceldev.fr/website/nodejs-vhost-configuration#readme)


### 2.1 installation de mongodb
#### 2.1.1 Mac OS
- Installation de HomeBrew

```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- Installation de MongoDB

```sh
$ brew install mongodb
```

```sh
$ sudo mkdir -p /data/db
```

```sh
$ sudo chown -R `id -u` /data/db 
```


##### 2.1.2 Start MongoDB

To start MongoDB, run mongod. For example, from the Command Prompt:

```sh
$ mongod
```



#### 2.2 Windows

##### 2.2.1 Download & Install
Download the latest production release of MongoDB from the MongoDB downloads page. Ensure you download the correct version of MongoDB for your Windows system. The 64-bit versions of MongoDB do not work with 32-bit Windows.

https://www.mongodb.org/downloads?_ga=1.72220243.1550228826.1446559100#production


##### 2.2.2 Configure

VOIR AVEC ERIC


##### 2.2.3 Start MongoDB

To start MongoDB, run mongod.exe. For example, from the Command Prompt:

```sh
$ C:\mongodb\bin\mongod.exe
```



### 3. création d'un projet :
- se placer à la racine du projet et executer la commande suivante 

```sh
$ project vhost create <nomduvhost> # nom du projet GITLAB
```

```sh
$ cd <nomduvhost>
```

```sh
$ project install
```

```sh
$ project server
```

```sh
$ project grunt serve
```
