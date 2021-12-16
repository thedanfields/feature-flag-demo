class TacoOptions {
    constructor() {
        this.base_proteins = [ 'asada', 'chicken', 'pastor'];
        this.base_shells = ['tortilla'];
        this.base_extras = ['cheese'];
        this.options = {
            proteins: [],
            shells: [],
            extras: []
        }
    }

    build_option(name) {
        const option_html = `<div id="${name}" class="option ${name}"></div>`;
        return option_html;
    }

    build_options(selector, protein_options) {
        const option_html_list = protein_options.map(option => this.build_option(option));
        const option_html = option_html_list.join('')
        $(selector).html(option_html)
    }

    order() {
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
        const orderedClass = 'ordered';

        function deselect(selector) {
            $(selector).removeClass(orderedClass);
        }

        function select(selector) {
            $(selector).addClass(orderedClass);
        }

        const random_protein = this.options.proteins[getRandomInt(this.options.proteins.length)];
        const random_shell = this.options.shells[getRandomInt(this.options.shells.length)];
        const random_extra = this.options.extras[getRandomInt(this.options.extras.length)];

        deselect(".options.proteins .option");
        deselect(".options.shells .option");
        deselect(".options.extras .option");

        select(`.options.proteins .option.${random_protein}`)
        select(`.options.shells .option.${random_shell}`)
        select(`.options.extras .option.${random_extra}`)

        return `you got a <span class="ordered">${random_protein}</span> taco on a <span class="ordered">${random_shell}</span> with extra <span class="ordered">${random_extra}</span>`;
    }

    render(feature_flags) {

        this.previous = {
            proteins: this.options.proteins.length,
            shells: this.options.shells.length,
            extras: this.options.extras.length
        }

        const new_proteins = [...this.base_proteins];
        if (feature_flags?.unleashed?.protein_add_nopal)
            new_proteins.push('nopal')

        if (feature_flags?.unleashed?.protein_add_cricket)
            new_proteins.push('cricket')

        if (feature_flags?.unleashed?.protein_add_fish)
            new_proteins.push('fish')

        const new_shells = [...this.base_shells];
        if (feature_flags?.aws_app_config?.shell_corn)
            new_shells.push('elote');

        if (feature_flags?.aws_app_config?.shell_waffle)
            new_shells.push('waffle');

        const new_extras = [...this.base_extras];
        if (feature_flags?.launch_darkly?.extra_avocado)
            new_extras.push('avocado');

        if (feature_flags?.launch_darkly?.extra_pepper)
            new_extras.push('pepper')

        this.options.proteins = [...new Set(new_proteins)];
        if (this.previous.proteins !== this.options.proteins.length)
            this.build_options('.options.proteins', this.options.proteins)

        this.options.shells = [...new Set(new_shells)]
        if (this.previous.shells !== this.options.shells.length)
            this.build_options('.options.shells', this.options.shells)

        this.options.extras =[...new Set(new_extras)]
        if (this.previous.extras != this.options.extras.length)
            this.build_options('.options.extras', this.options.extras)


    }

}