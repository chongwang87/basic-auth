import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
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

export default function Resume() {
	const classes = useStyles(),
		history = useHistory(),
		{ enqueueSnackbar } = useSnackbar(),
		[state, setState] = useState({})

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (Object.keys(state).length < 5){
			enqueueSnackbar('Please fill up the required fields', { variant: 'error' })
		} else {
			fetch('http://localhost:8080/api/uploadResumeDetails', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(state)
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.err) {
						enqueueSnackbar(res.err, { variant: 'error' })
					} else if (res.data) {
						enqueueSnackbar('Done.', { variant: 'success' })
						history.push(`/resume/${ res.data._id }`)
					}
				}) 
		}
	}
	const handleBack = () => {
		history.goBack()
	}

	return (
		<main className={ classes.layout }>
			<Paper className={ classes.paper }>
				<Typography component="h1" variant="h4" align="center">
					Resume
				</Typography>
				<form className={ classes.form } noValidate>
					<Grid container spacing={ 3 }>
						<Grid item xs={ 12 } sm={ 6 }>
							<TextField
								autoComplete="fname"
								fullWidth
								id="firstName"
								label="First name"
								name="firstName"
								required
								onChange={ handleChange }
							/>
						</Grid>
						<Grid item xs={ 12 } sm={ 6 }>
							<TextField
								autoComplete="lname"
								fullWidth
								id="lastName"
								label="Last name"
								name="lastName"
								required
								onChange={ handleChange }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								fullWidth
								id="currentCompany"
								label="Current Company"
								name="currentCompany"
								required
								onChange={ handleChange }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								fullWidth
								id="jobTitle"
								label="Designation"
								name="jobTitle"
								required
								onChange={ handleChange }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								fullWidth
								id="jobDesc"
								label="Job Description"
								multiline={ true }
								name="jobDesc"
								rows={ 8 }
								rowsMax={ 15 }
								onChange={ handleChange }
							/>
						</Grid>
					</Grid>
					<div className={ classes.buttons }>
						<Button onClick={ handleBack } className={ classes.button }>
							Back
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							onClick={ handleSubmit }
							className={ classes.button }
						>
							Submit
						</Button>
					</div>
				</form>
			</Paper>
		</main>
	)
}
