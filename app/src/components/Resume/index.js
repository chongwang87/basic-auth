import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	
}))

export default function Resume(){
	const classes = useStyles(),
		history = useHistory(),
		{ enqueueSnackbar, closeSnackbar } = useSnackbar(),
		[state, setState] = useState({ email: '', password: '' })

	return (<>
		Resume
	</>)

}