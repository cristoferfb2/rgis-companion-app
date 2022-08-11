import {
    trigger,
    transition,
    style,
    query,
    animate,
  } from '@angular/animations';

  export const fader =
  trigger('fader', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
        }),
      ], { optional: true }),
      // Animate the new page in
      query(':enter', [
        animate('600ms ease', style({ opacity: 1 })),
      ], { optional: true})
    ]),
]);