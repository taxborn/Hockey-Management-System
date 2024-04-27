# SideNav Component

* Route: app/_components 

## Description

The SideNav component provides a sidebar navigation for a web application using React and Next.js. It utilizes Heroicons for the navigation icons and is styled primarily using Tailwind CSS. The sidebar dynamically renders navigation links based on a predefined list of link details including names, URLs, and associated icons.

## Usage

To use the SideNav component, simply import it into a React component or page and include it in the JSX.


## Code Structure

* Imports:

  * React: Basic React import to use JSX.
  * Heroicons: A set of SVG icons imported from @heroicons/react/24/outline used in the navigation links.

  * Link: A component from Next.js for client-side transitions between routes.

* Link Data:
    * links: An array of objects where each object represents a navigation link with properties:

      * name: The display name of the link.
      * href: The URL path that the link points to.
      * icon: The React component for the icon associated with the link.

* Component Definition:

   * The SideNav is a functional component that returns a sidebar navigation.
   
   * Inside the component, a div element styled with Tailwind CSS classes is used to set up the sidebar's appearance and layout.
   
   * Navigation links are dynamically rendered using the map function on the links array. Each link uses the Next.js Link component for navigation, with nested icon and text elements.
## Styles
 * Tailwind CSS:
 
   * The sidebar (div) is styled with a purple background, flexible layout, padding, and conditional styling for different screen sizes using responsive classes (md: prefix).
 
   * Each link has specific Tailwind classes for dimensions, alignment, padding, hover effects, and focus states.
 
 ## Accessibility
 * Keyboard Navigation:
   
    * The focus styles (focus:bg-purple-700) ensure that the sidebar is accessible via keyboard navigation.
 
 ## Considerations
   * Responsive Design:
     
     * The sidebar layout adjusts from a row format in larger screens to a column format in smaller screens (md: responsive prefix in Tailwind CSS).
    
* Hover and Focus States:
  
  * Enhanced visual feedback through background color changes on hover and focus, improving user interaction experience.

* Icon and Text Visibility:

  * The text is hidden on smaller screens and only shown in medium and larger views, optimizing space utilization on smaller devices.




# Navbar Component
  * Route : app/_components

## Description
The Navbar component serves as the primary navigation bar for a web application, utilizing React and Next.js. It leverages the authentication state from Clerk to adjust navigation links and options displayed to the user. The component also features conditional rendering based on the user's authentication status and includes a logo image with a link to the home page.

## Usage
To use the Navbar component, import it into any React page where a top navigation bar is required, and include it within the JSX of your component.

## Code Structure

* Imports:
   
   * React: Basic React import to use JSX.
   
   * Link and Image: Components from Next.js for client-side routing and optimized image handling.
   
   * useAuth and UserButton: Hooks and components from @clerk/nextjs for handling authentication.
* Authentication Hook:
   * useAuth(): Retrieves the authentication state, specifically the userId, to determine whether the user is signed in.
* Component Definition:
  * Navbar is a functional component that returns a navigation bar.
  * Depending on the user's authentication status (checked via userId), the component renders different links and buttons.
## Layout and Styling
 
 * Navigation Bar:
   
   * A nav element with a purple background, full width, and padding.
   
   * Contains a div for layout management, using flex for alignment and spacing.
 * Logo and Home Link:
   
   * Uses the Link component to wrap the Image component, ensuring the logo is clickable and leads to the home page.
   
   * Conditional href in the Link adjusts the target URL based on the authentication status (userId).

* Team Name Display:
  * A text element that appears only on medium and larger screens (using md:block), displaying the name "MNSU Women's Hockey Team".
## Dynamic Content
 * Conditional Rendering:
   
   * If the user is authenticated (userId is present), a UserButton is displayed for user account management and sign-out.

   * If not authenticated, links for "sign in" and "sign up" are shown, directing users to authentication routes.

## Considerations
* Responsive Design:

  * The component uses responsive design techniques to adjust visibility and layout based on screen size.




# Next.js File-Based Routing System

## Overview

Next.js employs a file-based routing system that is pivotal in defining the structure of URLs and routes within a project. This system is directly tied to the arrangement of files and folders within the pages directory of your Next.js application. This method simplifies routing implementation and streamlines the management of the application's structure.
## Directory Structure and Routing

* Root Directory (home): Every file inside this pages directory corresponds to a route based on its path relative to this directory. The structure of the directories and files within home directly maps to the route paths in your application.

* Navigating to app/home in your application which serves as the entry page for this segment of the app.

* Additional Functionalities:
  
  * In the home directory, subfolders are organized to handle different functionalities of the application
  
    * calendar/: Manages the calendar features.
  
    * message/: Manages messaging functionalities.
  
    * planning/: Deals with planning tools.
  
    * whiteboard/: Facilitates interactive whiteboard features.
  
  * Each of these folders represents a separate feature module and is accessible through a specific sub-route under app/home.


