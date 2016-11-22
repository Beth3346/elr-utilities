const $ = require('jquery');

const elrAccordionNav = function(params = {}) {
    const self = {};
    const containerClass = params.containerClass || 'elr-accordion-nav';
    const labelClass = params.labelClass || 'elr-accordion-nav-label';
    const contentHolderClass = contentHolderClass || 'elr-accordion-nav-inner';
    const $container = $(`.${containerClass}`);

    const toggle = function($openContent, $openLabel) {
        const $that = $(this);
        const $nextContent = $that.next();

        if (!$nextContent.hasClass('active')) {
            $that.addClass('active');
            $nextContent.addClass('active');
        }

        $openLabel.removeClass('active');
        $openContent.removeClass('active');
    };

    // remove the hash mark from a url hash
    const trimHash = function(hash) {
        return hash.slice(0, 1);
    };

    const getCurrentPage = function(location, hash) {
        const startIndex = location.lastIndexOf('/') + 1;

        if (hash) {
            return `${location.slice(startIndex)}${hash}`;
        } else if (location.slice(0, 1) === '/') {
            return location.slice(startIndex);
        }

        return location;
    };

    const getCurrent = function() {
        const location = window.location.pathname;
        const hash = window.location.hash;
        const currentPage = getCurrentPage(location, hash);
        const $target = $container.find(`a[href="${currentPage}"]`)
            .addClass('active');

        if ($target.length) {
            return $target.closest('ul').parent('li');
        } else if (hash) {
            // if the hash doesn't exist in the menu remove it
            // and use the url instead
            return $container.find(`a[href="${location.slice(location.lastIndexOf('/') + 1)}"]`)
                .addClass('active')
                .closest('ul')
                .parent('li');
        } else {
            return false;
        }
    };

    const showCurrent = function($currentList) {
        $currentList.find('ul').addClass('active');
    };

    if ($container.length) {
        const $label = $container.find(`.${labelClass}`);
        const $content = $label.next('ul');
        const $currentList = getCurrent();

        if (!$currentList) {
            // showDefaultContent($expandedContent, $content);
        } else {
            $content.removeClass('active');
            showCurrent($currentList);
        }

        $(window).on('hashchange', function(){
            $container.find('a.active').removeClass('active');
            $content.removeClass('active');
            showCurrent(getCurrent());
        });

        $label.on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();

            const $openContent = $content.filter('.active');
            const $openLabel = $label.filter('.active');

            toggle.call(this, $openContent, $openLabel);
        });
    }

    return self;
};

export default elrAccordionNav;