import { useState } from 'react';
import { Redirect } from '@reach/router';

import Layout from '../../templates/layout';
import Title from '../../ui/title/title';
import ExportButton from './components/export-button/export-button';
import Footer from '../../shared/footer/footer';
import KitContent from '../../shared/kit-content/kit-content';

import '../import-export.scss';
import './export.scss';

export default function Export() {
	const [ isDownloading, setIsDownloading ] = useState( false ),
		getFooter = () => {
			if ( isDownloading ) {
				return;
			}

			return (
				<Footer separator justify="end">
					<ExportButton setIsDownloading={ setIsDownloading } />
				</Footer>
			);
		};

	return (
		<Layout type="export" footer={ getFooter() }>
			<section className="e-app-export">
				<Title
					primary={ __( 'Choose What to Include in the Kit', 'elementor' ) }
					secondary={ [ __( 'Choose the kit components to export, such as pages, site setting, headers and more.', 'elementor' ), __( 'By default, we will export all the components.', 'elementor' ) ] }
				/>

				{ isDownloading ? <Redirect to="/export/complete" noThrow /> : <KitContent type="export" /> }
			</section>
		</Layout>
	);
}
