//**Don't forget to implement the onload function for JS**

// Model controller
const modelController = (()=>{
    const documentData = {
        listItems:[
            {title:"Eat better",src:"apple_icon_128px.png",alt:"Apple"},
            {title:"Build confidence",src:"confidence_icon_128px.png",alt:"Confident person"},
            {title:"Feel stronger",src:"muscle_icon_128.png",alt:"Muscle arm"},
            {title:"Take control",src:"control_icon_128.png",alt:"super hero"},
        ],
        mediaContent:[
            {title:"Female performing pushups",src:"Fitness_Female_1_pushup.jpg"},
            {title:"Male kick boxing",src:"Fitness_Male_1_kick_boxing.jpg"},
            {title:"Female performing bicep curl",src:"Fitness_Female_2_bicep_curl.jpg"},
            {title:"Male flexing back muscles",src:"Fitness_Male_2_back_flex.jpg"},
        ],
        mediaContentSmall:[
            {title:"Female performing pushups",src:"Fitness_Female_1_pushup_SMALL.jpg"},
            {title:"Male kick boxing",src:"Fitness_Male_1_kick_boxing_SMALL.jpg"},
            {title:"Female performing bicep curl",src:"Fitness_Female_2_bicep_curl_SMALL.jpg"},
            {title:"Male flexing back muscles",src:"Fitness_Male_2_back_flex_SMALL.jpg"},
        ],
        formContent:[
            {labelID:'fname',labelName:'First Name'},
            {labelID:'lname',labelName:'Last Name'},
            {labelID:'email',labelName:'Email'},
        ],
        countries:["Canada","United States","Japan","United Kingdom","Mexico"],
        screenSize:{
            largeView :'LargeMedia',
            smallView : 'SmallMedia'
        }
    };

    return {
      docData:documentData
    };
})();

// View controller
const viewController = (()=>{
    const DOMStrings = {
        headerMedia:document.querySelector('.header-media'),
        headerMediaSmall:document.querySelector('.header-media-small'),
        listItems:document.querySelector('.list_items'),
        countryNames:document.getElementById('country'),
        formData:document.querySelector('.sign-up-form')
    };

    return {
        //List item DOM element
        renderListItems:(items)=>{
            const element = `
                <li class="cell align-self-middle small-6 medium-3 large-3">
                <img src="./img/icons/${items.src}" alt="${items.title}">
                <p>${items.title}</p>
           </li>
            `;
            DOMStrings.listItems.insertAdjacentHTML('beforeend',element);
        },

        //Img DOM element
        renderAllMediaContent:(mediaCon,mediaSize,DOMelement)=>{
            const renderImgMedia = `
            <li class="is-active orbit-slide">
                <figure class="orbit-figure">
                    <img class="orbit-image" src="./img/FitnessMedia/${mediaSize}/${mediaCon.src}" alt="${mediaCon.title}">
                </figure>
            </li>
            `;
            DOMelement.insertAdjacentHTML('beforeend',renderImgMedia);
        },

        //Render country names
        renderCountrySelection:(country)=>{
            const renderCountries = `
            <option value="${country}">${country}</option>
            `;
            DOMStrings.countryNames.insertAdjacentHTML('beforeend',renderCountries);
        },
        
        //Render form data
        renderFormData:(label)=>{
            const renderLabels = `
            <label for="${label.labelID}"><p>${label.labelName}</p></label>
            <input type="text" id="${label.labelID}" placeholder="${label.labelName}.." name="${label.labelID}" required>
            `;
            DOMStrings.formData.insertAdjacentHTML('beforebegin',renderLabels);
        },

        DOMStrings
    }
    
})(modelController);

// Controller
(function controller(modelCtrl,viewCtrl){
    
    const modelData = {
         //Device screen sizes
         large:modelCtrl.docData.screenSize.largeView,
         small:modelCtrl.docData.screenSize.smallView,
         //Media/img content
         largeMediaCon:modelCtrl.docData.mediaContent,
         smallMediaCon:modelCtrl.docData.mediaContentSmall,
         //Dom Elements
         items:modelCtrl.docData.listItems,
         countries:modelCtrl.docData.countries,
         labels:modelCtrl.docData.formContent,    
    }

    const viewData={
        smallScreens:viewCtrl.DOMStrings.headerMediaSmall,
        largeScreens:viewCtrl.DOMStrings.headerMedia,
    }
    
    //Render list items
    const renderListItems = (dataItems)=>{
        dataItems.forEach((el)=>{
            viewCtrl.renderListItems(el);
        });
    };
    
    //Render media content
     const renderMediaContent = (imgContent,size,DomElem)=>{
        imgContent.forEach((el)=>{
            viewCtrl.renderAllMediaContent(el,size,DomElem);
        });
    };
    
    //Render country options
    const renderCountryContent = (countries) =>{
        countries.forEach((el)=>{
            viewCtrl.renderCountrySelection(el);
        });
    };
    
    const renderFormContent = (labelContent)=>{
        labelContent.forEach((el)=>{
            viewCtrl.renderFormData(el);
        });
    };

    //Invoke render functions
    renderMediaContent(modelData.largeMediaCon,modelData.large,viewData.largeScreens);
    renderMediaContent(modelData.smallMediaCon,modelData.small,viewData.smallScreens);
    renderListItems(modelData.items);
    renderCountryContent(modelData.countries);
    renderFormContent(modelData.labels);


})(modelController,viewController);