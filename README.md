# ember-select-box

##Why 

- When you want simple native HTML select box wrapper  
  - that creates the options for you
  - uses closure actions for sending changes
  - allows you to use an ember data model as an option value
- ember-power-select
  - does not work on the iPad when using pencil
  - is a bit of overkill at times
- ember-selectx 
  - does not work ( at least for me )
  - does not create the options for you    


##Usage 

```handlebars

{{select-box
    prompt="Select User"
    labelPath='name'
    options=users
    selected=selectedUser
    onChange=(action setProperty user 'name')
}}


```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-select-box`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `ember test`
