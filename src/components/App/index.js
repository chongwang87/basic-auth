import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
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

export default function App() {
	const classes = useStyles()
	
	const handleSignIn = () => {

	}

	const handleSignUp = () => {

	}
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
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
