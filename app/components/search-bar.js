import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SearchBarComponent extends Component {
    @tracked text_input;
    @tracked array_results = [];

    //Detailed item values
    @tracked item_title = "";
    @tracked item_price = "";
    @tracked item_imgs_url = [];
    @tracked item_url = "";
    @tracked item_img_url_active;

    //Flags for states for the components
    @tracked search_flag = false;
    @tracked item_detail = false;
    

    @action
    async search(){
        var finaltitle = encodeURI(this.text_input);
        let response = await fetch(`https://api.mercadolibre.com/sites/MCO/search?q=${finaltitle}`);
        let {results} = await response.json();
        this.array_results = results;
        console.log(this.array_results);
        this.search_flag = true;
        this.item_detail = false;
    }

    @action clean(){
        this.text_input = "";
        this.search_flag = false;
        this.item_detail = false;
    }

    @action 
    async access_item(item_id){
        let response = await fetch(`https://api.mercadolibre.com/items/${item_id}`);
        let data = await response.json();
        this.item_title = data.title;
        this.item_price = data.base_price;
        this.item_imgs_urls = data.pictures;
        this.item_img_url_active = data.pictures[0];
        this.item_url = data.permalink;
        this.item_detail = true;
        this.search_flag = false;
        console.log(this.item_img_url_active);
        console.log(this.item_imgs_urls)
    }
}
