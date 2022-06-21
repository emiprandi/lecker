
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false }) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/screens/Login.svelte generated by Svelte v3.48.0 */

    const file$3 = "src/screens/Login.svelte";

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let t1;
    	let p0;
    	let t3;
    	let button;
    	let t5;
    	let p1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Lecker";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Keyboard-first music player";
    			t3 = space();
    			button = element("button");
    			button.textContent = "Login";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "Click to login with your Spotify account";
    			attr_dev(h1, "class", "svelte-29ntg6");
    			add_location(h1, file$3, 16, 4, 502);
    			attr_dev(p0, "class", "svelte-29ntg6");
    			add_location(p0, file$3, 17, 4, 522);
    			add_location(button, file$3, 19, 4, 562);
    			attr_dev(p1, "class", "svelte-29ntg6");
    			add_location(p1, file$3, 20, 4, 618);
    			attr_dev(div0, "class", "card svelte-29ntg6");
    			add_location(div0, file$3, 15, 2, 479);
    			attr_dev(div1, "class", "container svelte-29ntg6");
    			add_location(div1, file$3, 14, 0, 453);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			append_dev(div0, button);
    			append_dev(div0, t5);
    			append_dev(div0, p1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*beginLoginProcess*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Login', slots, []);

    	const beginLoginProcess = () => {
    		const client_id = '6619b58643b74163b1fbfbc49f2b81b4';
    		const url = `https://accounts.spotify.com/authorize?` + `client_id=${client_id}&` + `response_type=code&` + `redirect_uri=${encodeURIComponent('http://localhost:3000')}&` + `scope=${encodeURIComponent('streaming user-read-email user-read-private user-read-recently-played')}`;
    		window.location = url;
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Login> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ beginLoginProcess });
    	return [beginLoginProcess];
    }

    class Login extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Login",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const LOCALSTORE_KEY = 'lecker';

    const storage = {
      get: (key) => window.localStorage.getItem(key),
      set: (key, value) => {
        window.localStorage.setItem(key, value);
      }
    };

    function getQSParam(key) {
      return new URLSearchParams(window.location.search).get(key);
    }
    function isThereAPreviousSession() {
      return !!storage.get(LOCALSTORE_KEY);
    }
    const shouldGoThroughAuth = () => {
      return !!getQSParam('code') || isThereAPreviousSession();
    };

    const getSavedSession = () => {
      return JSON.parse(storage.get(LOCALSTORE_KEY));
    };

    const saveSession = (data) => {
      storage.set(LOCALSTORE_KEY, JSON.stringify(data));
    };

    function getTokenWithCode(code) {
      return fetch('/api/get-token', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      }).then((r) => r.json());
    }

    function refreshToken(refreshToken) {
      return fetch('/api/refresh-token', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      }).then((r) => r.json());
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const appState = writable('init');

    const auth = writable();
    auth.subscribe((value) => {
      if (value) {
        saveSession(value);
      }
    });

    const user = writable({});

    const device = writable('');

    /* src/screens/Auth.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1 } = globals;
    const file$2 = "src/screens/Auth.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let t_value = JSON.stringify(/*$auth*/ ctx[0], null, '\t') + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			add_location(div, file$2, 26, 0, 743);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$auth*/ 1 && t_value !== (t_value = JSON.stringify(/*$auth*/ ctx[0], null, '\t') + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $auth;
    	validate_store(auth, 'auth');
    	component_subscribe($$self, auth, $$value => $$invalidate(0, $auth = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Auth', slots, []);

    	onMount(async () => {
    		const code = getQSParam('code');

    		if (code) {
    			const newToken = await getTokenWithCode(code);
    			auth.set(newToken);
    			window.history.replaceState(null, '', '/');
    			appState.set('player');
    		} else {
    			const prevSession = getSavedSession();
    			const newSession = await refreshToken(prevSession.refresh_token);
    			const mergedAuthObjs = Object.assign({}, prevSession, newSession);
    			auth.set(mergedAuthObjs);
    			appState.set('player');
    		}
    	});

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Auth> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		getQSParam,
    		getSavedSession,
    		getTokenWithCode,
    		refreshToken,
    		auth,
    		appState,
    		$auth
    	});

    	return [$auth];
    }

    class Auth extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Auth",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    const req = async (endpoint, qs = {}, options = {}) => {
      const BASE_URL = 'https://api.spotify.com/v1/';
      const authStore = get_store_value(auth);

      options.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.access_token}`
      };

      const url = new URL(endpoint, BASE_URL);
      url.search = new URLSearchParams(qs).toString();

      const data = await fetch(url, options);
      const response = await data.json();

      return response;
    };


    const getMe = async () => {
      return await req('me');
    };

    /* src/screens/Player.svelte generated by Svelte v3.48.0 */
    const file$1 = "src/screens/Player.svelte";

    function create_fragment$1(ctx) {
    	let script;
    	let script_src_value;
    	let t0;
    	let section0;
    	let div1;
    	let div0;
    	let t2;
    	let input;
    	let t3;
    	let div2;
    	let t5;
    	let section1;
    	let div10;
    	let a0;
    	let div3;
    	let t7;
    	let div4;
    	let t9;
    	let div9;
    	let div5;
    	let t11;
    	let div8;
    	let div6;
    	let t13;
    	let div7;
    	let t15;
    	let div21;
    	let div12;
    	let div11;
    	let t17;
    	let h1;
    	let t19;
    	let p;
    	let t21;
    	let div20;
    	let a1;
    	let div13;
    	let svg;
    	let path;
    	let t22;
    	let div19;
    	let div14;
    	let t24;
    	let div18;
    	let div15;
    	let t26;
    	let div16;
    	let t28;
    	let div17;

    	const block = {
    		c: function create() {
    			script = element("script");
    			t0 = space();
    			section0 = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "S";
    			t2 = space();
    			input = element("input");
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "LECKER";
    			t5 = space();
    			section1 = element("section");
    			div10 = element("div");
    			a0 = element("a");
    			div3 = element("div");
    			div3.textContent = "1";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "img";
    			t9 = space();
    			div9 = element("div");
    			div5 = element("div");
    			div5.textContent = "Result song name";
    			t11 = space();
    			div8 = element("div");
    			div6 = element("div");
    			div6.textContent = "Artists";
    			t13 = space();
    			div7 = element("div");
    			div7.textContent = "5 tracks";
    			t15 = space();
    			div21 = element("div");
    			div12 = element("div");
    			div11 = element("div");
    			div11.textContent = "art";
    			t17 = space();
    			h1 = element("h1");
    			h1.textContent = "album name";
    			t19 = space();
    			p = element("p");
    			p.textContent = "artists";
    			t21 = space();
    			div20 = element("div");
    			a1 = element("a");
    			div13 = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t22 = space();
    			div19 = element("div");
    			div14 = element("div");
    			div14.textContent = "track name";
    			t24 = space();
    			div18 = element("div");
    			div15 = element("div");
    			div15.textContent = "artists";
    			t26 = space();
    			div16 = element("div");
    			div16.textContent = " ";
    			t28 = space();
    			div17 = element("div");
    			div17.textContent = "1:22";
    			document.title = "Lecker";
    			if (!src_url_equal(script.src, script_src_value = "https://sdk.scdn.co/spotify-player.js")) attr_dev(script, "src", script_src_value);
    			add_location(script, file$1, 28, 2, 568);
    			attr_dev(div0, "class", "shortcut svelte-13mnmmg");
    			add_location(div0, file$1, 33, 4, 698);
    			attr_dev(input, "placeholder", "Search music...");
    			attr_dev(input, "class", "svelte-13mnmmg");
    			add_location(input, file$1, 34, 4, 732);
    			attr_dev(div1, "class", "search svelte-13mnmmg");
    			add_location(div1, file$1, 32, 2, 673);
    			attr_dev(div2, "class", "logo svelte-13mnmmg");
    			add_location(div2, file$1, 36, 2, 783);
    			attr_dev(section0, "class", "header svelte-13mnmmg");
    			add_location(section0, file$1, 31, 0, 646);
    			attr_dev(div3, "class", "shortcut svelte-13mnmmg");
    			add_location(div3, file$1, 41, 6, 905);
    			attr_dev(div4, "class", "image svelte-13mnmmg");
    			add_location(div4, file$1, 42, 6, 941);
    			attr_dev(div5, "class", "info-primary svelte-13mnmmg");
    			add_location(div5, file$1, 44, 8, 1003);
    			attr_dev(div6, "class", "artists svelte-13mnmmg");
    			add_location(div6, file$1, 46, 10, 1099);
    			attr_dev(div7, "class", "tracks svelte-13mnmmg");
    			add_location(div7, file$1, 47, 10, 1144);
    			attr_dev(div8, "class", "info-secondary svelte-13mnmmg");
    			add_location(div8, file$1, 45, 8, 1060);
    			attr_dev(div9, "class", "info svelte-13mnmmg");
    			add_location(div9, file$1, 43, 6, 976);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-13mnmmg");
    			add_location(a0, file$1, 40, 4, 886);
    			attr_dev(div10, "class", "search-results svelte-13mnmmg");
    			add_location(div10, file$1, 39, 2, 853);
    			attr_dev(div11, "class", "artwork svelte-13mnmmg");
    			add_location(div11, file$1, 54, 6, 1278);
    			attr_dev(h1, "class", "svelte-13mnmmg");
    			add_location(h1, file$1, 55, 6, 1315);
    			attr_dev(p, "class", "svelte-13mnmmg");
    			add_location(p, file$1, 56, 6, 1341);
    			attr_dev(div12, "class", "album svelte-13mnmmg");
    			add_location(div12, file$1, 53, 4, 1252);
    			attr_dev(path, "d", "M8.85005 0.0299152C8.25314 0.0284451 7.66815 0.196936 7.16347 0.515689C6.65878 0.834441 6.25517 1.17465 6 1.71429C5.69904 1.06013 5.18275 0.644731 4.53727 0.325612C3.89178 0.00649339 3.15631 -0.0813783 2.45381 0.0766865C1.75131 0.234751 1.12436 0.629173 0.67776 1.19402C0.23116 1.75886 -0.00801947 2.45989 0.000205251 3.17992C0.000205251 6.47992 6 11 6 11C6 11 12 6.47992 12 3.17992C12 2.34448 11.6681 1.54327 11.0774 0.952529C10.4867 0.361789 9.68547 0.0299152 8.85005 0.0299152Z");
    			attr_dev(path, "fill", "#695ACA");
    			add_location(path, file$1, 62, 12, 1561);
    			attr_dev(svg, "width", "12");
    			attr_dev(svg, "height", "11");
    			attr_dev(svg, "viewBox", "0 0 12 11");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$1, 61, 10, 1453);
    			attr_dev(div13, "class", "liked svelte-13mnmmg");
    			add_location(div13, file$1, 60, 8, 1423);
    			attr_dev(div14, "class", "info-primary svelte-13mnmmg");
    			add_location(div14, file$1, 66, 10, 2138);
    			attr_dev(div15, "class", "artists svelte-13mnmmg");
    			add_location(div15, file$1, 68, 12, 2232);
    			attr_dev(div16, "class", "key svelte-13mnmmg");
    			add_location(div16, file$1, 69, 12, 2279);
    			attr_dev(div17, "class", "duration svelte-13mnmmg");
    			add_location(div17, file$1, 70, 12, 2321);
    			attr_dev(div18, "class", "info-secondary svelte-13mnmmg");
    			add_location(div18, file$1, 67, 10, 2191);
    			attr_dev(div19, "class", "info svelte-13mnmmg");
    			add_location(div19, file$1, 65, 8, 2109);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "svelte-13mnmmg");
    			add_location(a1, file$1, 59, 6, 1402);
    			attr_dev(div20, "class", "track-list svelte-13mnmmg");
    			add_location(div20, file$1, 58, 4, 1371);
    			attr_dev(div21, "class", "player svelte-13mnmmg");
    			add_location(div21, file$1, 52, 2, 1227);
    			attr_dev(section1, "class", "content svelte-13mnmmg");
    			add_location(section1, file$1, 38, 0, 825);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, script);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section0, anchor);
    			append_dev(section0, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t2);
    			append_dev(div1, input);
    			append_dev(section0, t3);
    			append_dev(section0, div2);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, div10);
    			append_dev(div10, a0);
    			append_dev(a0, div3);
    			append_dev(a0, t7);
    			append_dev(a0, div4);
    			append_dev(a0, t9);
    			append_dev(a0, div9);
    			append_dev(div9, div5);
    			append_dev(div9, t11);
    			append_dev(div9, div8);
    			append_dev(div8, div6);
    			append_dev(div8, t13);
    			append_dev(div8, div7);
    			append_dev(section1, t15);
    			append_dev(section1, div21);
    			append_dev(div21, div12);
    			append_dev(div12, div11);
    			append_dev(div12, t17);
    			append_dev(div12, h1);
    			append_dev(div12, t19);
    			append_dev(div12, p);
    			append_dev(div21, t21);
    			append_dev(div21, div20);
    			append_dev(div20, a1);
    			append_dev(a1, div13);
    			append_dev(div13, svg);
    			append_dev(svg, path);
    			append_dev(a1, t22);
    			append_dev(a1, div19);
    			append_dev(div19, div14);
    			append_dev(div19, t24);
    			append_dev(div19, div18);
    			append_dev(div18, div15);
    			append_dev(div18, t26);
    			append_dev(div18, div16);
    			append_dev(div18, t28);
    			append_dev(div18, div17);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(script);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(section1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $user;
    	let $auth;
    	validate_store(user, 'user');
    	component_subscribe($$self, user, $$value => $$invalidate(1, $user = $$value));
    	validate_store(auth, 'auth');
    	component_subscribe($$self, auth, $$value => $$invalidate(2, $auth = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Player', slots, []);
    	let player;

    	window.onSpotifyWebPlaybackSDKReady = () => {
    		player = new Spotify.Player({
    				name: 'Lecker!',
    				getOAuthToken: cb => {
    					cb($auth.access_token);
    				},
    				volume: 0.5
    			});

    		player.addListener('ready', ({ device_id }) => {
    			device.set(device_id);
    		});

    		player.connect();
    	};

    	onMount(async () => {
    		set_store_value(user, $user = await getMe(), $user);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Player> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		auth,
    		user,
    		device,
    		getMe,
    		player,
    		$user,
    		$auth
    	});

    	$$self.$inject_state = $$props => {
    		if ('player' in $$props) player = $$props.player;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class Player extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Player",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/Main.svelte generated by Svelte v3.48.0 */
    const file = "src/Main.svelte";

    // (24:34) 
    function create_if_block_4(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "LOADING!";
    			add_location(div, file, 24, 2, 565);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(24:34) ",
    		ctx
    	});

    	return block;
    }

    // (22:33) 
    function create_if_block_3(ctx) {
    	let player;
    	let current;
    	player = new Player({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(player.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(player, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(player.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(player.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(player, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(22:33) ",
    		ctx
    	});

    	return block;
    }

    // (20:31) 
    function create_if_block_2(ctx) {
    	let auth;
    	let current;
    	auth = new Auth({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(auth.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(auth, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(auth.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(auth.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(auth, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(20:31) ",
    		ctx
    	});

    	return block;
    }

    // (18:32) 
    function create_if_block_1(ctx) {
    	let login;
    	let current;
    	login = new Login({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(login.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(login, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(login.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(login.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(login, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(18:32) ",
    		ctx
    	});

    	return block;
    }

    // (16:0) {#if $appState === 'init'}
    function create_if_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Init!";
    			add_location(div, file, 16, 2, 376);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(16:0) {#if $appState === 'init'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	const if_block_creators = [
    		create_if_block,
    		create_if_block_1,
    		create_if_block_2,
    		create_if_block_3,
    		create_if_block_4
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$appState*/ ctx[0] === 'init') return 0;
    		if (/*$appState*/ ctx[0] === 'login') return 1;
    		if (/*$appState*/ ctx[0] === 'auth') return 2;
    		if (/*$appState*/ ctx[0] === 'player') return 3;
    		if (/*$appState*/ ctx[0] === 'loading') return 4;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $appState;
    	validate_store(appState, 'appState');
    	component_subscribe($$self, appState, $$value => $$invalidate(0, $appState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);

    	if (shouldGoThroughAuth()) {
    		appState.set('auth');
    	} else {
    		appState.set('login');
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Login,
    		Auth,
    		Player,
    		appState,
    		shouldGoThroughAuth,
    		$appState
    	});

    	return [$appState];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new Main({
    	target: document.body,
    	props: {}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
