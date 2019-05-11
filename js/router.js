;(function (vm, Router) {
	const router = new Router();
	['all', 'active', 'completed'].forEach((item) => {
		router.on(item, () => {
			vm.todoLocation = item
		})
	})
	router.configure({
		notfound: function () {
			window.location.hash = ''
			vm.todoLocation = 'all'
		}
	})
	router.init()

})(vm, Router)
