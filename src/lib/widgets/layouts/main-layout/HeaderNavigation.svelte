<nav class="header_navigation">
    <ul>
        <li>
            <a href="#123">
                Main page
            </a>
        </li>
        <li>
            <a href="#123">
                Christmass Tree
            </a>
        </li>
        <li>
            <a href="#123">
                About site
            </a>
        </li>
        <li>
            <a href="#123">
                Something
            </a>
        </li>
    </ul>
</nav>

<style lang="scss">
	.header_navigation {
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;

			li {
				margin-right: 20px;

				a {
					color: var(--text-light);
					text-decoration: none;
					font-size: 16px;

					&:hover {
						color: var(--accent-gold);
					}
				}
			}
		}
	}
</style>
