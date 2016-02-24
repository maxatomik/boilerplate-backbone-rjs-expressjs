## Boilerplate BackBone/ExpressJS
1.0

#### 1. installation des modules node indispensable
```sh
$ sudo npm install pm2 -g
```

```sh
$ sudo npm install -g grunt-cli
```

### 2. installation de mongodb
#### 2.1 Mac OS
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

#### 2.2 Windows

##### 2.2.1 Download & Install
Download the latest production release of MongoDB from the MongoDB downloads page. Ensure you download the correct version of MongoDB for your Windows system. The 64-bit versions of MongoDB do not work with 32-bit Windows.

https://www.mongodb.org/downloads?_ga=1.72220243.1550228826.1446559100#production


##### 2.2.2 Configure

```sh
$ md \data\db
```

You can specify an alternate path for data files using the --dbpath option to mongod.exe, for example:


```sh
$ C:\mongodb\bin\mongod.exe --dbpath d:\test\mongodb\data
```

If your path includes spaces, enclose the entire path in double quotes, for example:

```sh
$ C:\mongodb\bin\mongod.exe --dbpath "d:\test\mongo db data"
```

You may also specify the dbpath in a configuration file.


##### 2.2.3 Start MongoDB

To start MongoDB, run mongod.exe. For example, from the Command Prompt:

```sh
$ C:\mongodb\bin\mongod.exe
```






### 3. installation du bootstrap :
- se placer à la racine du projet et executer la commande suivante 

```sh
$ ./project install
```

```sh
$ ./project vhost create nomduvhost
```

```sh
$ ./project server
```

```sh
$ ./project grunt serve
```
