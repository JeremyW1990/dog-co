
  

# Dog-co

  

  

A full stack React, NodeJS and MySQL app.</br>

  

Website: https://dog-co.jeremywang.dev/

  

  

## Introduction

  

  

- For this project, you will see a single-page React dog-walking application.

  

- As a user, you can accept requests, walking your neighbor's dog

  

- or submit a walk schedule, letting your neighbor walk your dog at a designated time.

  

  

## How to Use

  

1. The app needs two users to manifest main features.

  

2. Recommend you open two google chrome incognito windows to test it.</br>
   Incognito window will prevent local storage data from contaminating each other.

  

3. Login
	- Login as `Jeremy` in the first incognito window ( window 1 )

	- Login as `Howard` in the second incognito window ( window 2 )

	- We strongly recommend window 2 should be on a mobile device!

  

4. Submit a new walking request: (operate in window 1)

	- Click the white dog paw in the middle of the screen, the main menu panel will be displayed

	- Click `New Request` button on the left, when new walk plan form will be displayed
	  
	- Set up the `Walk Date` and `Walk Time`, leave `A Note` as well if you want

	-  `Submit` the form

  

5. Check my request pool: ( operate in window 1)

	- Click `My Requests` in the main menu

	- The page will show you the walk plan under your responsibility under `My Walk`

	- The page will also show you the walk plan you have already submit for others under `Walk My Dog`

	- You should find a walking plan under `Walk My Dog`, which `Status` is `pairing`. Yes, we just created this walking plan.

  

6. Choose a walking plan: ( operate in window 2)

	- Click the white dog paw in the middle of the screen, the main menu panel will be displayed

	- Click `Neighbour Requests` on the right

	- In the new page, you will see the pending request submitted from window 1

	- Click `Walk This` and confirm the modal. You will see it update to `My Walk`

  

7. Validate the confirmed walk plan:

	- In window 1, at `user-requests` page, under `Walk My Dog`, you will see the `Status` becomes `paired` already. `Walker` is `Howard Moore`.

	- In window 2, at `user-requests` page, under `My Walk`, you will see the `Status` becomes `paired` already. `Owner` is `Jeremy Wang`.

8. Start a walk: ( operate in window 2)

	- Click the `Walk Now` at `user-requests` page, under `My Walk`
	  
	- Confirm the modal to start the walk immediately

	- The app will be redirected to a map, you walking path will be drawing on the map

	- Hold your mobile device, have a walk around, to see what happens on the map

	- Click `Complete` to end this walk.

  

9. Watch your dog's walking: ( operate in window 1)

	- Click `Live-Watch` in the main menu, if you have a walking plan which is currently walking by others, you will see a live stream route update on the map.

  

  

  

## Getting Local Installed

  

  

1. Fork this repository to your GitHub account.

  

2. Clone the fork to your local directory.

  

```
git clone https://github.com/[Your_GitHub_Name]/dog-co
```

  

3. Navigate to your local directory. Install all dependencies in `package.json` with NPM.

  

```
npm install
```

  

4. Create a new local MySQL database called 'dog-co'

  

  

5. Import file `mysql_dump.sql` under folder `/database` in the local directory to 'dog-co' database

  

  

6. Rename `mysql.config.js.config` under folder `/database` in local directory to `mysql.config.js`

  

```
sudo cp /database/mysql.config.js.config /database/mysql.config.js
```

  

7. Open `mysql.config.js`, change `'database'` to `'dog-co'`, </br>

  

change `'host'`, `'user'`, `'password'` to your local MySQL config. </br>**NOTE**: Keep the single quote.

  

  

8. Start the Apache web server

  

```
sudo service apache2 start
```

  

9. Start the local MySQL database

  

```
sudo service mysql start

```
10. Run the project locally. You should receive `｢wdm｣: Compiled successfully.` in the terminal.

  ```
  npm run dev

  ```

  

11. Open your browser, navigate to `http://localhost:3000/`. You should be seeing the app.

  

## Key Future Features

1. Complete use register and login logic. Now app just has two users to demonstrate MVP.

2. Walk history/log record. User can check his/her history as a walker or owner.

3. Enrich walk plan type: instance, recursive, etc...

4. Complete chat system. Let users in the neighborhood can easily find and communicate with each other.

5. Create a new table in database for chat history. Now history has not been saved to database.

6. Fix landscape display bug.

  

## NPM Scripts

  

  

-  `dev` - Start Webpack Dev Server at port `localhost:3000`

  

-  `build` - Run Webpack to build the React client into `server/public`.