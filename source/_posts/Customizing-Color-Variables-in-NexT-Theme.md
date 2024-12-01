---
title: Customizing Color Variables in NexT Theme
date: 2024-12-01 17:32:57
tags: hexo
categories: code
---

# **Customizing Color Variables in NexT Theme**

1. **Refer to Custom File Documentation**  
    Visit the official NexT documentation on [Custom Files](https://theme-next.js.org/docs/advanced-settings/custom-files) to understand the custom file setup.
    
2. **Find Color Variables**  
    Open the `themes/next/source/css/_colors.styl` file in your Hexo project. This file contains the default color variables used throughout the theme.<!-- more -->
    
3. **Set Up Custom Variables File**
    
    - Navigate to `source/_data/` (create this directory if it doesn’t exist).
    - Create a `variables.styl` file in this directory:
        
        ```bash
        touch source/_data/variables.styl
        ```
        
4. **Overwrite Variables**  
    Add your custom color variables in `variables.styl`:
    
    ```stylus
    // Example customizations
    $primary-color = #255378;        // Main theme color
    $body-bg-color = #f4f4f4;       // Background color
    $link-hover-color = #2ecc71;    // Link hover color
    ```
    
5. **Enable Custom Variables**  
    Edit `_config.next.yml` and set the custom variable file path:
    
    ```yaml
    custom_file_path:
      variable: source/_data/variables.styl
    ```
    
6. **Regenerate and Test**  
    Run the following commands to preview your changes:
    
    ```bash
    hexo clean & hexo g & hexo s
    ```
    

