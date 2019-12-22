import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	or : {
		textAlign: 'center'
	},
	submit: {
		margin: theme.spacing(2, 0),
	},
}))

export default function Account() {
	const classes = useStyles(),
		history = useHistory(),
		{ enqueueSnackbar } = useSnackbar(),
		[state, setState] = useState({ email :'', password:'' })
	
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name] : e.target.value
		})
	}
	const handleSignIn = (e) => {
		e.preventDefault()
		fetch('http://localhost:8080/api/v1/auth/signIn', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: state.email,
				password: state.password,
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.err) {
					enqueueSnackbar('Email & Password combination wrong.', { variant: 'error' })
				} else if (res.data) {
					global.localStorage.setItem('id', res.data._id)
					global.localStorage.setItem('token', res.data.services.token)
					enqueueSnackbar('You sign in successfully.', { variant: 'success' })
					history.push('/resume')
				}
			})     
	}

	const handleSignUp = (e) => {
		e.preventDefault()
		fetch('http://localhost:8080/api/v1/auth/signUp', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: state.email,
				password: state.password,
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.err){
					switch (res.err.code) {
					case 11000:
						enqueueSnackbar(`You already has an account registered using ${ state.email }, please proceed to sign in.`, { variant: 'error' })
						break
					default:
						enqueueSnackbar(res.err, { variant: 'error' })
						break
					}
				} else if (res.data) {
					global.localStorage.setItem('id', res.data._id)
					global.localStorage.setItem('token', res.data.services.token)
					enqueueSnackbar('You account created successfully.', { variant: 'success' })
				}
			})
	}
	return (
		<Container component="main" maxWidth="xs">
			<div className={ classes.paper }>
				<Avatar className={ classes.avatar }>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={ classes.form } noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={ handleChange }
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={ handleChange }
					/>
					<Button
						fullWidth
						variant="contained"
						color="secondary"
						size="large"
						className={ classes.submit }
						onClick={ handleSignIn }
					>
						Sign In
					</Button>
					<Typography className={ classes.or }>
						Or	
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						className={ classes.submit }
						onClick={ handleSignUp }
					>
						Sign Up
					</Button>
				</form>
			</div>
		</Container>
	)
}
