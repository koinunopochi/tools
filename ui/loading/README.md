# Loading Components

Simple, customizable loading animations implemented with pure HTML and CSS. These components are designed to be lightweight and easily adaptable for framework integration.

## Available Components

- Loading Bar - A horizontal progress bar animation
- Loading Dots Slide - Sliding dots animation
- Loading Pulse - Pulsing circle animation
- Loading Rippling Square - Expanding square animation
- Loading Spinner - Rotating spinner animation
- Loading Text Fall - Animated falling text effect
- Loading Transform Circle - Circle transformation animation
- Loading Triangle Rotation - Rotating triangle animation

## Usage

Each component is contained in a single HTML file with embedded CSS. To use a component, simply copy the relevant HTML and CSS into your project.

Example (Loading Bar):

```html
<div class="loading-bar-container">
  <div class="loading-bar"></div>
</div>

<style>
  .loading-bar-container {
    width: 80%;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    overflow: hidden;
  }

  .loading-bar {
    width: 0%;
    height: 100%;
    background: #fff;
    animation: load 2s ease-in-out infinite;
  }

  @keyframes load {
    0% { width: 0%; }
    50% { width: 100%; }
    100% { width: 0%; }
  }
</style>
```

## Customization

Each component can be customized through CSS variables or direct style modifications:

- Colors: Change the background and foreground colors
- Size: Adjust width, height, and other dimensions
- Animation: Modify duration and timing functions
- Position: Change the layout and positioning as needed

## Framework Integration

These components are built with vanilla HTML and CSS, making them easy to integrate into any framework:

1. Extract the HTML structure
2. Convert the CSS to your framework's styling solution
3. Optionally wrap the component in a framework-specific component

The simple implementation ensures smooth migration to frameworks like React, Vue, or any other preferred solution.
