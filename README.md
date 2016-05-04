# OwlCarousel Sync Plugin
This is a plugin to sync two Owl Carousels.

##### Inspired by @tonykiefer's script in http://vertx.com/edc-transit-sling

See:
- https://github.com/OwlCarousel2/OwlCarousel2/issues/1350
- https://github.com/OwlCarousel2/OwlCarousel2/issues/1377

## Description

This function was made to supply the need to synchronize two OwlCarousels. 
**E.g.:** embed product gallery.

## Usage

Just follow the steps:

1. Construct your exhibition carousel and your nav carousel the way you want.
2. Use jQuery selector (or variable with the carousel Object) and plug the plugin on it, the plugin has an Object parameter.
3. In the Object parameter, put the $(selector) of the nav carousel in the key 'target' or 'syncWith'. See example below:
  
  ```javascript
  $('.owl-exhibition').owlSync({
      target: $('.owl-nav')
  });
  ```
4. You can still pass the duration (in milliseconds) of the slide transition and the index of first slide: 
  
  ```javascript
  $('.owl-exhibition').owlSync({
      syncWith: $('.owl-nav'),
      duration: 200, // this is an int variable that represents time in milliseconds (ms)
      startIndex: 3 // will link the carousels on the fourth slide.
  });
  ```

#### Aditional usage information:
Object options has the $('.owl-nav') jQuery object and duration of slide transition. (example above)



###### Copyright (c) 2016 Luiz Filipe Machado Barni
