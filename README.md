# sapui5-mandelbrot
SAPUI5 shenanigans - Mandelbrot fractal in sap.m.Table

Learning by doing.

This is not right.

But it's fun.

![image](https://user-images.githubusercontent.com/74537631/109410639-85b4a680-799c-11eb-9242-3989c26fde2f.png)

### Why?
To get a deeper understanding of how the SAPUI5 works and the different ways of accomplishing things, I decided to go through the SAPUI5 Walkthrough again and dig deeper beyond what was explained. I also wanted some kind of resource to go back to in order to see how I did things in different ways.

One way of learning is to push things, break things, and put them together again, and in some ways I kind of did that here.

And since I experienced a new-found appreciation for fractals recently, why should I not render a Mandelbrot set in a SAPUI5 sap.m.Table?
(I don't think the Fiori design guidelines strictly forbids it, but if this is a business requirement, maybe SAPUI5 is not the best choice for it)

### What this is not
Just to be safe I would like to mention that this is not good design, and there is a lot of mixing and matching of techniques inside here. I would prefer a solution to be consistent, but this was for learning and experimenting which is why. Don't do it like this for real. :)

### What this is
I wanted to make a resource for myself to refer to when future needs require some of the techniques used here, and why not share such a thing? If this can be useful for others, then it's all good. I haven't really documented this whole thing though (yet?) so there might be some investigation needed... :D

I wanted to do these things:
* Understand where to look for documentation and information
* Using the XMLView concept to separate the different views in different artefacts.
* Declare components directly in the view
* Programmatically add components from the controller
* Use a Fragment
* Have the fragment talk with the view that called it
* Use CSS to impact the look and design of things

I want to do these things "sometime in the future":
* Also mix in real data bindings from oData, and other souces
* See if a mock server can be used to generate the mandelbrot data
* Making custom controls
* Unit tests
* Please recommend me more... :)

### Resources used and/or recommended
[Learning SAPUI5 for Beginners on SAP Community](https://blogs.sap.com/2020/12/15/learning-sapui5-for-beginners/)

[SAPUI5 Demo Kit step by step walkthrough](https://ui5.sap.com/#/topic/3da5f4be63264db99f2e5b04c5e853db)

[YouTube video as a walkthrough of the SAPUI5 walkthrough](https://www.youtube.com/watch?v=mmSB85rWQ3w)

[SAPUI5 API Reference Documentation](https://sapui5.hana.ondemand.com/#/api)

[Descriptor for Applications, Components, and Libraries(manifest.json)](https://sapui5.hana.ondemand.com/#/topic/be0cf40f61184b358b5faedaec98b2da.html)

[Libraries and themes](https://openui5.hana.ondemand.com/topic/38ff8c27b022475a92b591bcf6262551)



