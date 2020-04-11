import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import {
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables,
} from '../../schemaTypes';

const createSubscriptionMutation = gql`
  mutation CreateSubscriptionMutation($source: String!) {
    createSubscription(source: $source) {
      id
      email
    }
  }
`;

export default class UserSubscriptionView extends React.Component {
  render() {
    return (
      <Mutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>
        mutation={createSubscriptionMutation}
      >
        {(mutate) => (
          <StripeCheckout
            token={async (token) => {
              const response = await mutate({
                variables: { source: token.id },
              });

              console.log('Subscription mutation response:', response);
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
          />
        )}
      </Mutation>
    );
  }
}
