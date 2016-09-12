using System.Collections.Generic;
using Telerik.ILS.Services.Courses.PracticalExams.CriteriaImporter;
public static class CriteriaForImporting
{
    public static IEnumerable<Criteria> GetCriteria()
    {
        return new List<Criteria>
        {
#region user-functionality
            new Criteria("Users Functionality", string.Empty, new List<Option>()),
            new Criteria("Registering users", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Login users", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("User login is persistent", "User is still logged-in after closing and reopening the browser", new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Logout users", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Hashing the password", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
#endregion

#region cookies-functionality
            new Criteria("Fortune Cookies Functionality", string.Empty, new List<Option>()),
            new Criteria("Showing all fortune cookies", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Sorting fortune cookies by date", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Sorting fortune cookies by likes", "Way of sorting is unimportant. Can use: likes, likes-dislikes, likes*likes/sqrt(dislikes), ecc..", new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Filter by category", string.Empty, new List<Option>
            {
                new Option("Show on different route", 3),
                new Option("Filtered with an input with auto complete", 3),
                new Option("Filtered with a dropdown", 3),
                new Option("Hide DOM elements", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Share a fortune cookie", "With text, category and optional image", new List<Option>
            {
                new Option("Implemented and working", 3),
                new Option("Not implemented", 0)
            }),
            new Criteria("Reshare a fortune cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 4),
                new Option("Not implemented", 0)
            }),
            new Criteria("Like fortune cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 3),
                new Option("Not implemented", 0)
            }),
            new Criteria("Dislike fortune cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
#endregion

#region hourly-cookie-functionality
            new Criteria("Hourly Fortune Cookie Functionality", string.Empty, new List<Option>()),
            new Criteria("Show the hourly fortune cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 3),
                new Option("Not implemented", 0)
            }),
#endregion

#region bonus-functionality
            new Criteria("Bonuses for Functionality", string.Empty, new List<Option>()),
            new Criteria("Categories shown from the server", "Using the `api/categories` endpoint", new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
#endregion

#region routs
            new Criteria("Routes implemented", string.Empty, new List<Option>()),
            new Criteria("Route `#/` redirects to `#/home`", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Route `#/home` shows fortune cookies", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Implemented on route `#/cookies`", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Route `#/home?category=CCC` shows only fortune cookies with this category", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 3),
                new Option("Not implemented", 0)
            }),
            new Criteria("Route `#/my-cookie` shows the hourly cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
#endregion

#region bonus-routs
            new Criteria("Bonuses for Routes", string.Empty, new List<Option>()),
            new Criteria("Creating cookies", string.Empty, new List<Option>
            {
                new Option("New route for creating cookies", 2),
                new Option("Using a popul/modal for creating cookies", 2),
                new Option("Implemented with imputs on listing page", 0)
            }),
#endregion

#region validation
            new Criteria("Username Validation", string.Empty, new List<Option>()),
            new Criteria("Is a string", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Has length between 6 and 30", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Can contain only Latin letters, digits and the characters '_' and '.'", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),

            new Criteria("Fortune Cookie Text Validation", string.Empty, new List<Option>()),
            new Criteria("Is a string", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Has length between 6 and 30", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Can contain any characters", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            
            new Criteria("Fortune Cookie Category Validation", string.Empty, new List<Option>()),
            new Criteria("Is a string", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Has length between 6 and 30", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Can contain any characters", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),

            new Criteria("Fortune Cookie Img Validation", string.Empty, new List<Option>()),
            new Criteria("Is a string", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Must be a valid url address", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
#endregion

#region usability
            new Criteria("Usability", string.Empty, new List<Option>()),
            new Criteria("Listing fortune cookies", string.Empty, new List<Option>
            {
                new Option("Clear and ordered", 2),
                new Option("Somewhat clear", 1),
                new Option("Not clear and ordered", 0)
            }),
            new Criteria("Navigation", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Hide buttons for Login/Logout", "Depending if user is logged-in or not", new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("`#/my-cookies` link", string.Empty, new List<Option>
            {
                new Option("Buton is hidden for not logged in users", 1),
                new Option("Redirects to `#/home` or promts for login", 1),
                new Option("Not hidden and does nothing when clicked by not logged in user", 0)
            }),
            new Criteria("Easy way to add categories", string.Empty, new List<Option>
            {
	            new Option("Autocomplete", 1),
	            new Option("Dropdown", 1),
	            new Option("Radio buttons", 1),
	            new Option("Other", 1),
	            new Option("Just a <input /> field", 0)
            }),
            new Criteria("Success/Error notifications for every operation", "Can be with 3rd party library (toastr) or with alert()", new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Show like/dislike buttons for each fortune cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Show share button for each fortune cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Show likes and dislikes count", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Showing image for each fortune cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Showing dates in a clear way", "String from server is parsed or processed in some way", new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
#endregion

#region bonus-usability
            new Criteria("Bonuses for Usability", string.Empty, new List<Option>()),
            new Criteria("Show the user, that created the fortune cookie", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
#endregion

#region code-quality
            new Criteria("Code quality", string.Empty, new List<Option>()),
            new Criteria("Separate object/objects for creating AJAX requests", "i.e. `data` object", new List<Option>
            {
                new Option("There is a separete object for the requests", 5),
                new Option("Some of the requests are in a separete object, some are mixed with the other code (UI, DOM, Routs, etc)", 3),
                new Option("Not implemented", 0)
            }),
            new Criteria("Using promises", string.Empty, new List<Option>
            {
                new Option("Using ES6 Promises", 3),
                new Option("Using the jQuery promises", 2),
                new Option("Using callbacks", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Separate object for loading handlebars templates/views", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Abstract way to handle AJAX requests", "i.e. using it, does not couple with jQuery AJAX", new List<Option>
            {
                new Option("Implemented and working", 4),
                new Option("Implemented but data access is still coupled with jQuery", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Validation", string.Empty, new List<Option>
            {
                new Option("Separate object for validation", 2),
                new Option("Reusing the methods for validating different strings", 2),
                new Option("Not implemented", 0)
            }),
#endregion
            
#region libraries
            new Criteria("Libraries", string.Empty, new List<Option>()),
            new Criteria("Using jQuery for AJAX requests", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Using Handlebars for all templates/views", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Using jQuery for event handling", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
            new Criteria("Using jQuery for DOM manipulations", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 2),
                new Option("Not implemented", 0)
            }),
#endregion
            
#region bonus-libraries
            new Criteria("Bonuses for Libraries", string.Empty, new List<Option>()),
            new Criteria("Using module loader", "System.js, Require.js or other", new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Using Sammy.js for routes", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Using Underscore.js/Lodash", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
            new Criteria("Using library for hashing passwords", string.Empty, new List<Option>
            {
                new Option("Implemented and working", 1),
                new Option("Not implemented", 0)
            }),
#endregion
        };
    }
}
