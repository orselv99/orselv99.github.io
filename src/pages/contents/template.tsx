import React, { useCallback, useEffect, useState } from 'react';
import { Menu } from '../menu';

import './content1.css'

// 복사해서 쓰자 template.css 까지
export const Content1 = () => {
  return (
    <>
      <Menu />
      <div id='content_container'>
        <h1>
          Content1
        </h1>
        <h2>The standard Lorem Ipsum passage, used since the 1500s</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <h2>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, </p>
        <p>eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, </p>
        <p>sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. </p>
        <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>
        <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,</p>
        <p>vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>

        <h2>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h2>
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,</p>
        <p>similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
        <p>Et harum quidem rerum facilis est et expedita distinctio.</p>
        <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus,</p>
        <p>omnis voluptas assumenda est, omnis dolor repellendus.</p>
        <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
        <p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>

      </div>
    </>
  )
}