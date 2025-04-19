# Cocktail-Finder
Cocktail-Finder is a modern web application designed to help users explore and discover cocktail recipes effortlessly. With an intuitive interface and seamless integration with TheCocktailDB API, users can access detailed information about cocktails, including ingredients, preparation instructions, and images.

## Dependencies

This project relies on several key dependencies to ensure smooth functionality and a modern development experience. Below is a list of the main dependencies used:

| Dependency          | Version   | Description                                                                 |
|---------------------|-----------|-----------------------------------------------------------------------------|
| lucide-react        | ^0.487.0  | A collection of beautifully crafted, customizable React icons.             |
| next                | 15.3.0    | The React framework for production-grade web applications.                 |
| react               | ^19.0.0   | A JavaScript library for building user interfaces.                         |
| react-dom           | ^19.0.0   | Provides DOM-specific methods for React.                                   |
| swr                 | ^2.3.3    | A React Hooks library for data fetching with caching and revalidation.     |
| theme-change        | ^2.5.0    | A utility for dynamically changing themes in web applications.             |

## Development Dependencies

For development purposes, the following tools and libraries are utilized to enhance the developer experience and maintain code quality:

| Dependency          | Version   | Description                                                                 |
|---------------------|-----------|-----------------------------------------------------------------------------|
| @eslint/eslintrc    | ^3        | ESLint configuration helper for managing linting rules.                    |
| @tailwindcss/postcss| ^4        | PostCSS plugin for integrating Tailwind CSS.                               |
| @types/node         | ^20       | TypeScript type definitions for Node.js.                                   |
| @types/react        | ^19       | TypeScript type definitions for React.                                     |
| @types/react-dom    | ^19       | TypeScript type definitions for React DOM.                                 |
| daisyui             | ^5.0.18   | A Tailwind CSS plugin for building beautiful UI components.                |
| eslint              | ^9        | A tool for identifying and fixing JavaScript code issues.                  |
| eslint-config-next  | 15.3.0    | ESLint configuration preset for Next.js projects.                          |
| tailwindcss         | ^4        | A utility-first CSS framework for rapid UI development.                    |
| typescript          | ^5        | A strongly typed programming language that builds on JavaScript.           |

## API Documentation

This project utilizes [TheCocktailDB API](https://www.thecocktaildb.com/api.php) to fetch cocktail data. Below are some example endpoints:

### Search API
- Search by name:  
    ```
    www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
    ```
- Search by first letter:  
    ```
    www.thecocktaildb.com/api/json/v1/1/search.php?f=a
    ```
- Search by ingredient:  
    ```
    www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
    ```

### Lookup APIs
- Lookup cocktail details by ID:  
    ```
    www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
    ```
- Lookup ingredient details by ID:  
    ```
    www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552
    ```

### Filter APIs
- Filter by ingredient:  
    ```
    www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
    ```
    ```
    www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
    ```
- Filter by alcoholic content:  
    ```
    www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
    ```
    ```
    www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic
    ```
- Filter by category:  
    ```
    www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
    ```
    ```
    www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail
    ```