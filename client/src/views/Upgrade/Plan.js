import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        textAlign: 'center'
    },
});

export default function Plan() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <Card className={classes.root}>
                        <div className="alert alert-primary"><h3>Free</h3></div>
                        <CardContent>
                            <Typography className={classes.pos} color="textSecondary" >3 Offers</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >100 Views</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >30 Day Storage</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >Basic Analytics</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >OfferVid Branding</Typography>
                            <hr/>
                            
                            <Typography style={{visibility:'hidden'}} className={classes.pos} color="textSecondary" >Embed Code</Typography>
                            <hr style={{visibility:"hidden"}}/>
                        </CardContent>
                        <  div className="alert alert-primary text-center"><h3>Using</h3> </div>
                    </Card>
                </div>
                
                <div className="col-md-4">
                    <Card className={classes.root}>
                        <div className="alert alert-info"><h3>$12</h3></div>
                        <CardContent>
                            <Typography className={classes.pos} color="textSecondary" >100 Offers</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >10,000 Views</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >120 Day Storage</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >full Analytics</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >OfferVid Branding</Typography>
                            <hr/>
                            
                            <Typography className={classes.pos} color="textSecondary" >Embed Code</Typography>
                            <hr/>
                        </CardContent>
                        <  div style={{cursor:'pointer'}} className="alert alert-info text-center"><h3>Upgrade</h3> </div>
                    </Card>
                </div>
                
                <div className="col-md-4">
                    <Card className={classes.root}>
                        <div className="alert alert-info"><h3>$19</h3></div>
                        <CardContent>
                            <Typography className={classes.pos} color="textSecondary" >Unlimited Offers</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >50,000 Views</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >365 Day Storage</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >Full Analytics</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >Custom Branding</Typography>
                            <hr/>
                            <Typography className={classes.pos} color="textSecondary" >Embed Code</Typography>
                            <hr/>
                        </CardContent>
                        <  div style={{cursor:'pointer'}} className="alert alert-info text-center"><h3>Upgrade</h3> </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
