# **Diss-cord Project Clone**


Welcome to the **[Diss-cord Repo](https://github.com/Watts-Blake/Discord-proj)**, this is a clone of **[Discord](https://discord.com/)**. **Diss-cord Project Clone** is a web application that allows you to communicate with friends or colleagues through servers, server channels and direct messages.

# Table of Content

- [Technologies Used](#techonologies-used)
- [Link to Live Site](#link-to-live-site)
- [Index](#index)
- [Getting Started](#getting-started)
   - [For M1 Users](#dev-containers-for-m1-uers)
   - [Standard](#standard-traditional)
- [Screenshots of Usage](#screenshots-of-usage)
- [Code Snippets](#code-snippets)

# Techonologies Used
<img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" alt="drawing" width="50"/> <img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" alt="react" width="50"> 
<img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" alt="redux" width="50"> 
<img src="https://www.pngall.com/wp-content/uploads/5/Python-PNG.png" alt="python" width ="50"> 
<img src="https://user-images.githubusercontent.com/92463844/162601723-beb79065-3555-4c2d-86c1-37d914e6d7ae.png" alt="flask" width ="50"> 
<img src="https://camo.githubusercontent.com/d536b9cc0c533324368535ece721f5424f28eae3ec0e6f3847408948ecacfce6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667" alt="postgreSQL" width="50">
<img src="https://camo.githubusercontent.com/2e496d4bfc6f753ddca87b521ce95c88219f77800212ffa6d4401ad368c82170/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d6f726967696e616c2e737667" alt="css3" width="50"> 
<img src="https://camo.githubusercontent.com/da7acacadecf91d6dc02efcd2be086bb6d78ddff19a1b7a0ab2755a6fda8b1e9/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d6f726967696e616c2e737667" alt="html5" width="50"> 
<img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" alt="git" width="50"> 
<img src="https://camo.githubusercontent.com/5fa137d222dde7b69acd22c6572a065ce3656e6ffa1f5e88c1b5c7a935af3cc6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2e737667" alt="vscode" width="50"> 
<img src="https://www.govconwire.com/wp-content/uploads/2018/03/AWS-EM-1.jpg" alt="aws" width="50"/> 
<img src="https://www.kindpng.com/picc/m/207-2078621_electric-bikes-socket-io-facebook-icon-in-circle.png" alt="socketio" width="50"/>


# Link to Live Site

### **[Diss-cord](https://diss-cord.herokuapp.com/)**


# Index
[Feature List] | [API Documentation] | [Database Schema] | [User Stories and Acceptance Criteria] | [Front End Routes]


# Getting Started
## Installing the application (2 ways)
### Dev Containers (for M1 uers)

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed.
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer.
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/Watts-Blake/Discord-proj.git
   ```
4. Open the repo in VS Code.
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner.
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app.

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App, install the dependencies in the `react-app` folder and run the application.

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```
10. The application will start at [http://localhost:3000/](http://localhost:3000/).

### Standard (Traditional)

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/jonathancchsu/slack-clone-repo.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App, install the dependencies in the `react-app` folder and run the application.

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```
7. The application will start at [http://localhost:3000/](http://localhost:3000/).



# Screenshots of Usage

Home Page 
![image](https://user-images.githubusercontent.com/92361048/164978007-07196b34-d5a9-4dba-a0e5-df0a280f7755.png)

Sign up page 
![image](https://user-images.githubusercontent.com/92361048/164978031-074dc132-0abd-46db-9169-a6b3dd205624.png)

Login Page 
![image](https://user-images.githubusercontent.com/92361048/164978044-6053ffa2-492f-4792-a03c-00f49ed99e20.png)

Landing After Login Page 
![image](https://user-images.githubusercontent.com/92361048/164978094-b960674e-6fc7-49e5-a791-5951c1a5e00a.png)

Create Server Pages 
![image](https://user-images.githubusercontent.com/92361048/164978114-17663100-5c44-4a8a-a6e0-a195f4119aa4.png)
![image](https://user-images.githubusercontent.com/92361048/164978126-db6cbb3a-31f2-44bf-b7ea-05a997f65ac6.png)
![image](https://user-images.githubusercontent.com/92361048/164978137-2ed5204f-a98d-4b79-99d6-aff62d5b3aa6.png)

Server Discovery Page 
![image](https://user-images.githubusercontent.com/92361048/164978172-0745f29b-4061-4757-a69f-47bd6ae4fdaf.png)

Server View
![image](https://user-images.githubusercontent.com/92361048/164978197-731a521b-d66f-478e-a0bd-ca81aa1312a4.png)

Server Edit Page 
![image](https://user-images.githubusercontent.com/92361048/164978358-c37dff44-82c3-4a79-b0d1-023368060554.png)

Channel Creation Page 
![image](https://user-images.githubusercontent.com/92361048/164978276-6e48b89c-a89e-4439-aecd-c6ea96999121.png)

Channel Edit Page
![image](https://user-images.githubusercontent.com/92361048/164978349-40493e76-6501-4834-8168-171dbb518704.png)

Direct Message Page
![image](https://user-images.githubusercontent.com/92361048/164978381-5ae400c7-aaa4-43b7-b674-e5c54c0bd731.png)




