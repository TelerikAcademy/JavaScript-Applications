# Web Storages homework

## 1.	The Ship game

### Task description

*	The computer generates a random number with four different digits
	*	The leftmost digit must not be 0 (zero)
	*	For simplicity called `abcd`
*	At each turn the player enters a four-digit number
	*	For simplicity called `xyzw`
*	Implement a high-score list
*	**Sheep** means that a digit from `xyzw` is contained in `abcd`, but **not on the same position**
	*	If two such digits exists, the sheep are 2
*	**Ram** means that a digit from `xyzw` is contained in `abcd` and **it is on the same position**
		*	If two such digits exists, the rams are 2
*	The game continues until the player guesses the number `abcd`
	*	i.e. has 4 rams


###	Task implementation

Your task is to create an object, that has 3 methods:
*	`init(playerName, endCallback)`
	*	Starts a new game
	*	Generates a new number
	*	`playerName` is the name of the player in the high-score
	*	`endCallback` is a function that must be called when the game ends (the player wins)
		*	It is called after the **high-score** is updated
*	`guess(number)`
	*	Available only after `init()` is invoked
	 	*	Should throw otherwise
	*	The player makes a guess agains the number
	*	Returns as a result an object in the format:
		*	`{ sheep: 3, rams: 1 }`
*	`getHighScore(count)`
	*	Returns the top `count` players of the high-score
	*	If `count` is greater than the total count of players in the high-score, return the actual number of player in the high-score
	*	The returned players are returned in an array, where each player is in the format:
		*	`{name: 'Sheep master', score: 5}`
