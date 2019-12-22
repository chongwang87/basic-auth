import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { Link, useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}))

export default function ResumeDetails() {
	const classes = useStyles(),
		history = useHistory(),
		{ id } = useParams(),
		[state, setState] = useState(),
		{ enqueueSnackbar } = useSnackbar()

	async function fetchResume() {
		let res = await fetch(`http://localhost:8080/api/getResumeById/${ id }`)

		res.json()
			.then(res => {
				setState(res)
			})
			.catch(err => enqueueSnackbar(err, { variant: 'danger' }))
	}

	const handleBack = () => {
		history.goBack()
	}

	useEffect(() => {
		fetchResume()
	}, [id])

	return (
		<main className={ classes.layout }>
			<Paper className={ classes.paper }>
				<Typography component="h1" variant="h4" align="center">
					Resume
				</Typography>
				{ state && 
					<>
						<List>
							<ListItem>
								<ListItemText
									primary="Name"
									secondary={ state['name'] }
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Current Company"
									secondary={ state['currentCompany'] }
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Designation"
									secondary={ state['jobTitle'] }
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Job Description"
									secondary={ state['jobDesc'].split('\n').map((e, i) => <p key={ i }>{ e }</p>) }
								/>
							</ListItem>
						</List>
					<div className={ classes.buttons }>
						<Button
							variant="contained"
							color="primary"
							className={ classes.button }
							component={ Link }
							to="/resume"
						>
							New
						</Button>
					</div>
					</>
				}
			</Paper>
		</main>
	)
}